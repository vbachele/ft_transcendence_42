import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { ClientEvents, ServerEvents } from "./events/game.events";
import {
  LobbyCreateDto,
  LobbyInviteDto,
  LobbyJoinDto,
} from "./lobby/dtos/lobby.dto";
import { LobbyService } from "./lobby/lobby.service";
import { AuthenticatedSocket, ServerPayloads } from "./types/server.type";

type TCallback =  () => void;

@WebSocketGateway()
export class GameGateway extends WebsocketGateway implements OnGatewayInit {
  constructor(private readonly lobbyService: LobbyService) {
    super();
  }

  afterInit(server: Server) {
    this.lobbyService.server = this.server;
  }

  @SubscribeMessage(ClientEvents.CreateLobby)
  onCreateLobby(
    client: AuthenticatedSocket,
    data: LobbyCreateDto,
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    const lobby = this.lobbyService.create(data.mode);
    if (!lobby) throw new Error("Lobby creation error");
    else lobby.addClient(client);
    console.info(`Lobby created - ID[${lobby.id}] - Client ID[${client.id}]`);
    return {
      event: ServerEvents.GameMessage,
      data: {
        message: "Lobby created",
      },
    };
  }

  @SubscribeMessage(ClientEvents.JoinLobby)
  onJoinLobby(
    client: AuthenticatedSocket,
    data: LobbyJoinDto,
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    this.lobbyService.join(data.lobbyId, client);
    console.info(
      `User - [${client.id}] - joined the lobby - [${data.lobbyId}]`
    );
    return {
      event: ServerEvents.GameMessage,
      data: {
        message: "Lobby joined",
      },
    };
  }

  @SubscribeMessage(ClientEvents.InviteToLobby)
  onInviteToLobby(
    client: AuthenticatedSocket,
    data: LobbyInviteDto
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    const lobby = client.data.lobby;
    if (!lobby)
      throw new Error(`No lobby attached to user - [${client.id}]`);
    else lobby.inviteClient(client, data.invitedClient);
    return {
      event: ServerEvents.GameMessage,
      data: {
        message: `Invitation Declined`,
      },
    };
  }
}
