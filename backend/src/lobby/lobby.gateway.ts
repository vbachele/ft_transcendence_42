import {
	ConnectedSocket,
	MessageBody, OnGatewayConnection, OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets';
import {ClientEvents, ServerEvents} from './events/lobby.events';
import {LobbyService} from './lobby.service';
import {AuthenticatedSocket, ServerPayloads} from './types/lobby.type';
import {Server} from 'socket.io';
import {LobbyValidationPipe} from './dto/lobby.pipe';
import {JoinLobbyDto, LeaveLobbyDto, LobbyDto} from './dto/lobby.dto';
import {ValidationPipe} from '@nestjs/common';
import {ErrorType, LobbyException} from './errors/lobby.error';

/**
 * @brief This is where all the lobby requests are handled
 */
@WebSocketGateway()
export class LobbyGateway implements OnGatewayInit {
	@WebSocketServer()
	server: Server;

	async afterInit() {
		await this.lobbyService.loadLobbies();
	}

	constructor(protected readonly lobbyService: LobbyService) {}

	/**
	 * @brief Listen to CreateLobby event and proceed to creation when triggered
	 * @param client The client who requested the lobby creation
	 * @param body request body, protected by a validation pipe
	 * (see {@link LobbyValidationPipe} and {@link LobbyDto} for more information
	 * @return Dispatch the lobby creation result status to the client
	 * with the lobbyId if it applies
	 */
	@SubscribeMessage(ClientEvents.CreateLobby)
	async onCreateLobby(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new LobbyValidationPipe()) body: LobbyDto
	): Promise<WsResponse<ServerPayloads[ServerEvents.LobbyMessage]>> {
		try {
			const lobby = await this.lobbyService.create(body.type, body.data);
			this.lobbyService.join(lobby.id, client);

			console.info(
				`Lobby created - ID[${lobby.id}] - Client name[${client.data.name}]`
			);
			return {
				event: ServerEvents.LobbyMessage,
				data: {
					message: 'Lobby created',
					status: 'created',
					lobbyId: lobby.id,
				},
			};
		} catch (e) {
			throw new LobbyException(ErrorType.LobbyAlreadyExist);``
		}
		// if (!lobby) throw new WsException("Lobby creation error");
		// else this.lobbyService.join(lobby.id, client);
	}


	@SubscribeMessage(ClientEvents.JoinLobby)
	onJoinLobby(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) data: JoinLobbyDto
	): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
		this.lobbyService.join(data.lobbyId, client);

		return {
			event: ServerEvents.LobbyMessage,
			data: {
				message: 'Lobby joined',
			},
		};
	}

	@SubscribeMessage(ClientEvents.LeaveLobby)
	onLeaveLobby(
		client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) data: LeaveLobbyDto
	): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
		this.lobbyService.leave(data.lobbyId, client);

		console.info(
			`User - [${client.data.name}] - left the lobby - [${data.lobbyId}]`
		);

		return {
			event: ServerEvents.LobbyMessage,
			data: {
				message: 'Lobby left',
			},
		};
	}
}
