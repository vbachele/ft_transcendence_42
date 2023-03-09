import {Injectable} from "@nestjs/common";
import {Server} from "socket.io";
import { PrismaLobbyService } from "src/database/lobby/prismaLobby.service";
import {ConnectedSocket} from "@nestjs/websockets";
import {AuthenticatedSocket} from "../lobby/types/lobby.type";
import {LobbyService} from "../lobby/lobby.service";

@Injectable()
export class WebsocketService {
	constructor(private readonly prismaLobbyService: PrismaLobbyService) {
	}
	public server: Server;


}