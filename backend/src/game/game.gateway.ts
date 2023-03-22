import {
	ConnectedSocket,
	MessageBody,
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
import {GameLobby} from './gameLobby';

@WebSocketGateway()
export class GameGateway {
	private readonly queue: AuthenticatedSocket[] = [];

	constructor(
		private readonly gameService: GameService,
		private readonly lobbyService: LobbyService
	) {}

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
		console.log(data);
		this.gameService.gameSetup(client, data.lobbyId);
	}

	@SubscribeMessage(ClientGameEvents.Ready)
	onReady(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody() data: any
	) {
		console.info(`Client [${client.data.name}] ready`);
		this.gameService.runGame(data.lobbyId);
	}

	@SubscribeMessage(ClientGameEvents.MovePaddle)
	onMovePaddle(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) data: MovePaddleDto
	) {
		this.gameService.movePaddle(client, data);
	}

	@SubscribeMessage(ClientGameEvents.SearchGame)
	onSearchGame(@ConnectedSocket() client: AuthenticatedSocket) {
		this.queue.push(client);
		if (this.queue.length >= 2) {
			const lobby = this.lobbyService.create('game', {
				mode: 'duo',
			});
			console.log(`Lobby created: ${lobby.id}`);
			const player1 = this.queue.shift();
			const player2 = this.queue.shift();
			if (!player1 || !player2)
				throw new WsException('An error occurred during matchmaking');
			console.log(
				`player1: ${player1.data.name}, player2: ${player2.data.name}`
			);
			lobby.addClient(player1);
			lobby.addClient(player2);
			lobby.dispatchToLobby(ServerGameEvents.GameFound, {
				lobbyId: lobby.id,
			});
		}
	}

	@SubscribeMessage(ClientGameEvents.LeaveGame)
	onLeaveGame(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string
	) {
		console.log(`Client [${client.data.name}] left the game`);
		const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
		if (lobby.state === 'running') {
			lobby.dispatchToLobby(ServerGameEvents.GamePaused, {
				lobbyId: lobby.id,
			});
		} else {
			lobby.dispatchToLobby(ServerEvents.LobbyMessage, {
				message: `${client.data.name} left the game`,
			});
		}
	}
}
