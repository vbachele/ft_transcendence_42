import {Inject, Injectable} from '@nestjs/common';
import {AuthenticatedSocket} from './types/lobby.type';
import {ALobby} from './ALobby';
import {Server} from 'socket.io';
import {WebSocketServer, WsException} from '@nestjs/websockets';
import {TLobbyDto} from './dto/lobby.dto';
import {PrismaLobbyService} from '../database/lobby/prismaLobby.service';
import {ChatLobby, ChatLobbyDto} from '../chat/chatLobby';
import {ErrorType, LobbyException} from './errors/lobby.error';
import {GameLobby} from '../game/gameLobby';
import {ServerChatEvents} from '../chat/events/chat.events';
import {WebsocketService} from '../websocket/websocket.service';

/**
 * @brief This service manage all the lobby instances on the server
 * @param lobbyCreator The factory used to create different lobby types
 * @member lobbies The list of lobbies accessible via their ids
 */
@Injectable()
export class LobbyService {
	constructor(
		@Inject('LOBBY_FACTORY') private readonly lobbyCreator: any,
		private readonly prismaLobbyService: PrismaLobbyService,
		private readonly websocketService: WebsocketService,
	) {}

	private readonly lobbies: Map<ALobby['id'], ALobby> = new Map<
		ALobby['id'],
		ALobby
	>();

	@WebSocketServer()
	server: Server;

	/**
	 * @brief Load all the lobbies from the database when the server starts
	 */
	async loadLobbies() {
		const lobbies = await this.prismaLobbyService.fetchLobbies();
		lobbies.forEach((lobby) => {
			const data = {
				id: lobby.id,
				maxClients: lobby.maxClients,
				privacy: lobby.privacy,
				createdAt: lobby.createdAt,
				init: false,
			};
			this.lobbies.set(
				lobby.id,
				this.lobbyCreator.create({type: 'chat', data: data})
			);
			console.info(`Loaded lobby - [${lobby.id}]`);
		});
	}

	public getLobby(lobbyId: string): ALobby  | undefined{
		const lobby = this.lobbies.get(lobbyId);
		return lobby;
	}

	public async create(type: string, payload: TLobbyDto): Promise<ALobby> {
		const lobby = this.lobbyCreator.create({
			type: type,
			data: payload,
		}) as ALobby;
		if (type === 'chat') {
			await (lobby as ChatLobby).init(payload as ChatLobbyDto);
		}
		this.lobbies.set(lobby.id, lobby);
		return lobby;
	}

	public async join(lobbyId: string, client: AuthenticatedSocket) {
		const lobby = this.getLobby(lobbyId);
		if (!lobby) throw new LobbyException(ErrorType.LobbyNotFound)
		lobby.addClient(client);
		console.info(`Client [${client.data.name}] joined lobby [${lobbyId}]`);
	}

	public async leave(lobbyId: string, client: AuthenticatedSocket) {
		const lobby = this.getLobby(lobbyId);
		if (!lobby) throw new LobbyException(ErrorType.LobbyNotFound)
		lobby.removeClient(client);
		console.info(`Client [${client.data.name}] left lobby [${lobbyId}]`);
	}


	public delete(lobbyId: string) {
		const lobby = this.getLobby(lobbyId);
		if (lobby instanceof GameLobby) {
			lobby.clients.forEach(async (client) => {
				await this.websocketService.updateStatus(client, 'online');
			});
			delete lobby.instance;
		}
		this.lobbies.delete(lobbyId);
		console.info(`Lobby [${lobbyId}] deleted`);
	}
}
