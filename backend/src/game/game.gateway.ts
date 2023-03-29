import {
	ConnectedSocket,
	MessageBody,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WsException,
	WsResponse,
} from '@nestjs/websockets';
import {ClientEvents, ServerEvents} from '../lobby/events/lobby.events';
import {AuthenticatedSocket, ServerPayloads} from '../lobby/types/lobby.type';
import {FetchSetupDto, GameInviteDto, MovePaddleDto} from './dto/game.dto';
import {ClientGameEvents, ServerGameEvents} from './events/game.events';
import {GameService} from './game.service';
import {ValidationPipe} from '@nestjs/common';
import {LobbyService} from '../lobby/lobby.service';
import {GameLobby, GameLobbyDto} from './gameLobby';
import {PrismaService} from '../database/prisma.service';
import {GameMode} from './types/game.type';

@WebSocketGateway()
export class GameGateway implements OnGatewayDisconnect {
	private readonly queue = {
		[GameMode.AgainstTheClock]: [] as AuthenticatedSocket[],
		[GameMode.ScoreLimit]: [] as AuthenticatedSocket[],
	};

	constructor(
		private readonly gameService: GameService,
		private readonly lobbyService: LobbyService,
		private readonly prismaService: PrismaService
	) {}

	handleDisconnect(client: AuthenticatedSocket) {
		this.gameService.leaveLobby(client);
	}

	@SubscribeMessage(ClientGameEvents.Invite)
	onInviteToLobby(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) data: GameInviteDto
	): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
		console.log(data.invitedClientName);
		this.gameService.invite(client, data.invitedClientName, data.lobbyId);
		return {
			event: ServerEvents.LobbyMessage,
			data: {
				message: `Invitation sent`,
			},
		};
	}

	@SubscribeMessage(ClientEvents.InvitationResponse)
	onInvitationResponse(
		client: AuthenticatedSocket,
		data: any
	): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
		console.log(data);
		this.gameService.dispatchInvitationResponse(client, data);
		return {
			event: ServerEvents.LobbyMessage,
			data: {
				message: `Invitation ${data.status}`,
				status: data.status,
			},
		};
	}

	@SubscribeMessage(ClientGameEvents.FetchSetup)
	onFetchSetup(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) data: FetchSetupDto
	) {
		const gameSetup = this.gameService.gameSetup(client, data.lobbyId);
		return {
			event: ServerGameEvents.Setup,
			data: gameSetup,
		};
	}

	@SubscribeMessage(ClientGameEvents.Ready)
	onReady(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody() data: any
	) {
		console.info(`Client [${client.data.name}] ready`);
		this.gameService.updatePlayerState(client, data.lobbyId);
	}

	@SubscribeMessage(ClientGameEvents.MovePaddle)
	onMovePaddle(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) data: MovePaddleDto
	) {
		this.gameService.movePaddle(client, data);
	}

	@SubscribeMessage(ClientGameEvents.SearchGame)
	async onSearchGame(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) body: GameLobbyDto
	) {
		console.log(`game request`);
		this.queue[body.mode].push(client);
		if (this.queue[body.mode].length >= 2) {
			const lobby = await this.lobbyService.create('game', {
				mode: body.mode,
			});
			console.log(`Lobby created: ${lobby.id}`);
			const player1 = this.queue[body.mode].shift();
			const player2 = this.queue[body.mode].shift();
			if (!player1 || !player2 || player1 === player2)
				throw new WsException('An error occurred during matchmaking');
			console.log(
				`player1: ${player1.data.name}, player2: ${player2.data.name}`
			);
			lobby.addClient(player1);
			lobby.addClient(player2);
			player1.data.gameLobby = lobby as GameLobby;
			player2.data.gameLobby = lobby as GameLobby;
			lobby.dispatchToLobby(ServerGameEvents.GameFound, {
				lobbyId: lobby.id,
			});
		}
	}

	@SubscribeMessage(ClientGameEvents.CancelSearch)
	onCancelSearch(@ConnectedSocket() client: AuthenticatedSocket) {
		this.queue[GameMode.AgainstTheClock] = this.queue[
			GameMode.AgainstTheClock
		].filter((c) => c !== client);
		this.queue[GameMode.ScoreLimit] = this.queue[GameMode.ScoreLimit].filter(
			(c) => c !== client
		);
		console.log(`Client [${client.data.name}] canceled search`);
	}

	@SubscribeMessage(ClientGameEvents.CancelInvitation)
	onCancelInvitation(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string,
		@MessageBody('invitedClientName') invitedClientName: string
	) {
		console.log(`Client [${client.data.name}] canceled invitation`);
		this.gameService.cancelInvitation(client, lobbyId, invitedClientName);
	}

	@SubscribeMessage(ClientGameEvents.LeaveGame)
	onLeaveGame(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string
	) {
		console.log(`Client [${client.data.name}] left the game`);
		// const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
		// if (lobby.state === 'running') {
		// 	lobby.dispatchToLobby(ServerGameEvents.GamePaused, {
		// 		lobbyId: lobby.id,
		// 	});
		// } else {
		// 	lobby.dispatchToLobby(ServerEvents.LobbyMessage, {
		// 		message: `${client.data.name} left the game`,
		// 	});
		// }
		this.gameService.leaveLobby(client);
	}

	@SubscribeMessage(ClientGameEvents.FetchGames)
	async onFetchGames(@MessageBody('name') name: string) {
		const games = await this.prismaService.game.findMany({
			where: {
				OR: [{leftPlayerName: name}, {rightPlayerName: name}],
			},
		});
		return {games};
	}
}
