import { ALobby } from "./ALobby";
import { Server } from "socket.io";
import {ForbiddenException, Injectable} from "@nestjs/common";
import {IsString} from "class-validator";
import {AuthenticatedSocket} from "./types/lobby.type";
import {WebsocketService} from "../websocket/websocket.service";
import {WsException} from "@nestjs/websockets";

export class GameLobbyDto {
  @IsString()
  mode: string;
}

@Injectable()
export class GameLobby extends ALobby {
  data: GameLobbyDto;
  constructor(data: GameLobbyDto, private readonly websocketService: WebsocketService) {
    super(websocketService.server);
    this.data = data;
    this.afterInit();
  }

  afterInit() {
  }

  validateClient(client: AuthenticatedSocket) {
    if (!this.clients.has(client.data.name)) throw new ForbiddenException(`The client doesn't belong to the lobby`)
  }

}
