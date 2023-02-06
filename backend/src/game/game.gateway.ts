import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { ClientEvents, ServerEvents } from "./events/game.events";
import { TClientPayloads } from "./game.types";
import { LobbyCreateDto } from "./lobby/dtos/lobby.dto";
import { LobbyService } from "./lobby/lobby.service";
import { AuthenticatedSocket, ServerPayloads } from "./types/server.type";

@WebSocketGateway()
export class GameGateway extends WebsocketGateway {
  constructor(private readonly lobbyService: LobbyService) {
    super();
  }

  @SubscribeMessage(ClientEvents.CreateLobby)
  onCreateLobby(
    client: AuthenticatedSocket,
    data: LobbyCreateDto
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    const lobby = this.lobbyService.create(data.mode);
    return {
      event: ServerEvents.GameMessage,
      data: {
        message: "Lobby created",
      },
    };
  }
}
