import {
	ConnectedSocket,
	MessageBody,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WsException,
} from '@nestjs/websockets';
import {ClientEvents, ServerEvents} from '../lobby/events/lobby.events';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {FetchSetupDto, GameInviteDto, MovePaddleDto} from './dto/game.dto';
import {ClientGameEvents, ServerGameEvents} from './events/game.events';
import {GameService} from './game.service';
import {ValidationPipe} from '@nestjs/common';
import {LobbyService} from '../lobby/lobby.service';
import {GameLobby, GameLobbyDto} from './gameLobby';
import {PrismaService} from '../database/prisma.service';
import {GameMode} from './types/game.type';
import {WebsocketService} from '../websocket/websocket.service';
import {UserService} from '../api/users/users.service';

@WebSocketGateway()
export class GameGateway implements OnGatewayDisconnect {
	private readonly queue = {
		[GameMode.AgainstTheClock]: [] as AuthenticatedSocket[],
		[GameMode.ScoreLimit]: [] as AuthenticatedSocket[],
	};

	constructor(
		private readonly gameService: GameService,
		private readonly lobbyService: LobbyService,
		private readonly prismaService: PrismaService,
		private readonly websocketService: WebsocketService,
		private readonly userService: UserService
	) {}

	async handleDisconnect(client: AuthenticatedSocket) {
		this.gameService.leaveLobby(client);
		this.queue[GameMode.AgainstTheClock] = this.queue[
			GameMode.AgainstTheClock
		].filter((c) => c !== client);
		this.queue[GameMode.ScoreLimit] = this.queue[GameMode.ScoreLimit].filter(
			(c) => c !== client
			);
			console.log(`Client [${client.data.name}] canceled search`);
			await this.websocketService.updateStatus(client, 'online');
	}

	@SubscribeMessage(ClientGameEvents.Invite)
	async onInviteToLobby(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) data: GameInviteDto
	) {
		const player = await this.userService.getUser(data.invitedClientName);
		const invitedClient = this.websocketService.getClient(
			data.invitedClientName
		);
		if (
			!player ||
			player.status === 'offline' ||
			player.status === 'busy' ||
			!invitedClient
		) {
			throw new WsException(
				`Player ${data.invitedClientName} is not available`
			);
		}
		await this.websocketService.updateStatus(client, 'busy');
		await this.websocketService.updateStatus(invitedClient, 'busy');
		console.log(data.invitedClientName);
		await this.gameService.invite(client, data.invitedClientName, data.lobbyId);
		return {
			event: ServerEvents.LobbyMessage,
			data: {
				message: `Invitation sent`,
			},
		};
	}

	@SubscribeMessage(ClientEvents.InvitationResponse)
	async onInvitationResponse(client: AuthenticatedSocket, data: any) {
		await this.gameService.dispatchInvitationResponse(client, data);
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
		await this.websocketService.updateStatus(client, 'busy');
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
			const leftPlayer = await this.userService.getUser(player1.data.name);
			const rightPlayer = await this.userService.getUser(player2.data.name);
			lobby.dispatchToLobby(ServerGameEvents.GameFound, {
				lobbyId: lobby.id,
				players: {
					leftPlayer: leftPlayer,
					rightPlayer: rightPlayer,
				},
			});
		}
	}

	@SubscribeMessage(ClientGameEvents.CancelSearch)
	async onCancelSearch(@ConnectedSocket() client: AuthenticatedSocket) {
		this.queue[GameMode.AgainstTheClock] = this.queue[
			GameMode.AgainstTheClock
		].filter((c) => c !== client);
		this.queue[GameMode.ScoreLimit] = this.queue[GameMode.ScoreLimit].filter(
			(c) => c !== client
		);
		console.log(`Client [${client.data.name}] canceled search`);
		await this.websocketService.updateStatus(client, 'online');
	}

	@SubscribeMessage(ClientGameEvents.CancelInvitation)
	async onCancelInvitation(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string,
		@MessageBody('invitedClientName') invitedClientName: string
	) {
		console.log(`Client [${client.data.name}] canceled invitation`);
		this.gameService.cancelInvitation(client, lobbyId, invitedClientName);
		await this.websocketService.updateStatus(client, 'online');
	}

	@SubscribeMessage(ClientGameEvents.LeaveGame)
	onLeaveGame(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string
	) {
		console.log(`Client [${client.data.name}] left the game`);
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
	@SubscribeMessage(ClientGameEvents.Spectate)
	onSpectate(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string
	) {
		this.lobbyService.join(lobbyId, client);
		const lobby = this.lobbyService.getLobby(lobbyId);

		console.log(`Client [${client.data.name}] spectating`);
	}

	@SubscribeMessage(ClientGameEvents.LobbyFromUser)
	async onLobbyFromUser(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('username') username: string
	) {
		const user = this.websocketService.getClient(username);
		if (!user || !user.data.gameLobby)
			throw new WsException('User is not in game');
		console.log(
			`Client [${client.data.name}] requested lobby from user, lobbyId: ${user?.data.gameLobby?.id}`
		);
		const lobby = user.data.gameLobby;
		const leftPlayer = await this.userService.getUser(
			[...lobby.clients.values()][0].data.name
		);
		const rightPlayer = await this.userService.getUser(
			[...lobby.clients.values()][1].data.name
		);
		return {
			event: ServerGameEvents.LobbyFromUser,
			data: {
				lobbyId: lobby.id,
				leftPlayer: leftPlayer,
				rightPlayer: rightPlayer,
			},
		};
	}
}
