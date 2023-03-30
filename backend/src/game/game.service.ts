import {Injectable} from '@nestjs/common';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {LobbyService} from '../lobby/lobby.service';
import {ServerGameEvents} from './events/game.events';
import {ServerEvents} from '../lobby/events/lobby.events';
import {MovePaddleDto} from './dto/game.dto';
import {GameLobby} from './gameLobby';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {WebsocketService} from '../websocket/websocket.service';
import {UserService} from '../api/users/users.service';

@Injectable()
export class GameService {
	constructor(
		private readonly websocketService: WebsocketService,
		private readonly lobbyService: LobbyService,
		private readonly userService: UserService
	) {}

	public async invite(
		client: AuthenticatedSocket,
		invitedClientName: string,
		lobbyId: string
	) {
		const invitedClient = this.websocketService.getClient(invitedClientName);
		if (!invitedClient) {
			throw new WsException(`User [${invitedClientName}] not found`);
		}
		console.log(`Invited client [${invitedClientName}]`);
		const leftPlayer = await this.userService.getUser(client.data.name);
		const rightPlayer = await this.userService.getUser(invitedClientName);
		this.websocketService.server
			.to(invitedClient.id)
			.emit(ServerGameEvents.Invitation, {
				lobbyId: lobbyId,
				leftPlayer: leftPlayer,
				rightPlayer: rightPlayer,
			});
	}

	public cancelInvitation(
		client: AuthenticatedSocket,
		lobbyId: string,
		invitedClientName: string
	) {
		console.log(`Canceling invitation to [${invitedClientName}]`);
		const invitedClient = this.websocketService.getClient(invitedClientName);
		if (!invitedClient) {
			throw new WsException(`User [${invitedClientName}] not found`);
		}
		this.websocketService.server
			.to(invitedClient.id)
			.emit(ServerGameEvents.InvitationCancelled, {
				lobby: {id: lobbyId, type: 'game'},
			});
		this.lobbyService.delete(lobbyId);
	}

	public async dispatchInvitationResponse(
		client: AuthenticatedSocket,
		data: any
	) {
		const lobby = this.lobbyService.getLobby(data.lobby) as GameLobby;
		if (!lobby) throw new WsException('Lobby not found');
		const invitationSender = [...lobby.clients.values()][0];
		console.log(`sender: ${invitationSender.data.name}`);
		console.log(`client: ${client.data.name}`);
		let leftPlayer = undefined;
		let rightPlayer = undefined;
		switch (data.status) {
			case 'accepted':
				break;
			case 'declined':
				this.lobbyService.delete(data.lobby);
		}
		if (data.status === 'accepted') {
			this.lobbyService.join(data.lobby, client);
			leftPlayer = await this.userService.getUser(invitationSender.data.name);
			rightPlayer = await this.userService.getUser(client.data.name);
		} else if (data.status === 'declined') {
			this.lobbyService.delete(data.lobby);
			await this.websocketService.updateStatus(invitationSender, 'online');
			await this.websocketService.updateStatus(client, 'online');
		}
		this.websocketService.server
			.to(invitationSender.id)
			.emit(ServerEvents.InvitationResponse, {
				state: data.status,
				lobbyId: data.lobby,
				leftPlayer: leftPlayer,
				rightPlayer: rightPlayer,
			});
	}

	public gameSetup(
		@ConnectedSocket() client: AuthenticatedSocket,
		lobbyId: string
	) {
		const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
		lobby.validateClient(client);
		lobby.playerStates.set(client.data.name, 'notReady');
		lobby.state = 'ready';
		return lobby.gameSetup();
	}

	public updatePlayerState(
		@ConnectedSocket() client: AuthenticatedSocket,
		lobbyId: string
	) {
		const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
		lobby.playerStates.set(client.data.name, 'ready');
		const playerStates = Array.from(lobby.playerStates.values());
		if (
			playerStates.every((state) => state === 'ready') &&
			playerStates.length >= 2
		) {
			lobby.runGame();
		}
		console.info(`Game started in lobby [${lobbyId}]`);
	}

	public movePaddle(client: AuthenticatedSocket, data: MovePaddleDto) {
		const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
		lobby.validateClient(client);
		lobby.movePaddle(client, data.direction as 'up' | 'down');
	}

	public leaveLobby(@ConnectedSocket() client: AuthenticatedSocket) {
		if (!client.data.gameLobby) return;
		const lobby = this.lobbyService.getLobby(
			client.data.gameLobby.id
		) as GameLobby;
		lobby.dispatchToLobby(ServerGameEvents.ClientLeft, {
			client: client.data.name,
		});
		if (lobby.state === 'running') {
			lobby.stopGame();
		}
		lobby.instance?.kill();
		lobby.removeClient(client);
		delete client.data.gameLobby;
		client.data.gameLobby = undefined;
		if (lobby.clients.size === 0) {
			this.lobbyService.delete(lobby.id);
		}
	}
}
