import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {WebsocketGateway} from "../websocket/websocket.gateway";
import {ClientEvents} from "../lobby/events/lobby.events";
import {LobbyService} from "../lobby/lobby.service";
import {AuthenticatedSocket} from "../lobby/types/server.type";
import {GameLobby} from "../lobby/gameLobby";
import {Server} from "socket.io";
import {LobbyGateway} from "../lobby/lobby.gateway";

@WebSocketGateway()
export class GameGateway {

	constructor(private readonly lobbyService: LobbyService) {

	}


	@WebSocketServer()
	server: Server;

	@SubscribeMessage(ClientEvents.InviteToLobby)
	onInviteToLobby(
		client: AuthenticatedSocket,
		data: any,
	) {
		const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
		lobby.invitation();
	}
}