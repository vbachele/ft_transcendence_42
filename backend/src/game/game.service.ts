import {Injectable} from '@nestjs/common';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {LobbyService} from '../lobby/lobby.service';
import {ServerGameEvents} from './events/game.events';
import {ServerEvents} from '../lobby/events/lobby.events';
import {MovePaddleDto} from './dto/game.dto';
import {GameLobby} from './gameLobby';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {WebsocketService} from '../websocket/websocket.service';

@Injectable()
export class GameService {
	constructor(
		private readonly websocketService: WebsocketService,
		private readonly lobbyService: LobbyService
	) {}

	public invite(
		client: AuthenticatedSocket,
		invitedClientName: string,
		lobbyId: string
	) {
		const invitedClient = this.websocketService.getClient(invitedClientName);
		if (!invitedClient) {
			throw new WsException(`User [${invitedClientName}] not found`);
		}
		console.log(`Invited client [${invitedClientName}]`);
		this.websocketService.server
			.to(invitedClient.id)
			.emit(ServerGameEvents.Invitation, {
				lobby: {id: lobbyId, type: 'game'},
			});
	}

	public dispatchInvitationResponse(client: AuthenticatedSocket, data: any) {
		const lobby = this.lobbyService.getLobby(data.lobby.id) as GameLobby;
		lobby.dispatchToLobby(ServerEvents.InvitationResponse, {
			response: data.status,
			lobby: data.lobby,
		});
		setTimeout(() => {
			switch (data.status) {
				case 'accepted':
					this.lobbyService.join(data.lobby.id, client);
					break;
				case 'declined':
					console.log(`declined`);
					this.lobbyService.delete(data.lobby.id);
			}
		}, 1_000);
	}

	public gameSetup(
		@ConnectedSocket() client: AuthenticatedSocket,
		lobbyId: string
	) {
		const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
		lobby.validateClient(client);
		lobby.playerStates.set(client.data.name, 'notReady');
		return lobby.gameSetup();
	}

	public updatePlayerState(
		@ConnectedSocket() client: AuthenticatedSocket,
		lobbyId: string
	) {
		const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
		lobby.playerStates.set(client.data.name, 'ready');
		const playerStates = Array.from(lobby.playerStates.values());
		if (playerStates.every((state) => state === 'ready')) {
			lobby.runGame();
		}
		console.info(`Game started in lobby [${lobbyId}]`);
	}

	public movePaddle(client: AuthenticatedSocket, data: MovePaddleDto) {
		const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
		lobby.validateClient(client);
		lobby.movePaddle(client, data.direction as 'up' | 'down');
	}

	public moveBall(client: AuthenticatedSocket, data: any) {
		const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
		lobby.validateClient(client);
		const isInLobby = lobby.clients.get(client.data.name);
		if (!isInLobby)
			throw new WsException(`You're not authorized to access this lobby`);
		lobby.dispatchToOpponent(client, ServerGameEvents.MoveBall, {
			x: data.x,
			y: data.y,
		});
	}
}
