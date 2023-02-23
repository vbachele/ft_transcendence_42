import {
  ConnectedSocket,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { ClientEvents, ServerEvents } from "./events/lobby.events";
import { LobbyCreateDto, LobbyInviteDto, LobbyJoinDto } from "./dtos/lobby.dto";
import { LobbyService } from "./lobby.service";
import { AuthenticatedSocket, ServerPayloads } from "./types/server.type";

@WebSocketGateway()
export class LobbyGateway extends WebsocketGateway implements OnGatewayInit {
  constructor(private readonly lobbyService: LobbyService) {
    super();
  }

  async handleConnection(
    @ConnectedSocket() client: AuthenticatedSocket,
    ...args: any[]
  ) {
    client.data.name = client.handshake.query.name as string;
    console.info(`Connected - Client Name [${client.data.name}]`);
    await this.lobbyService.initializeSocket(client);
  }
  afterInit() {
    this.lobbyService.server = this.server;
  }

  @SubscribeMessage(ClientEvents.CreateLobby)
  async onCreateLobby(
    client: AuthenticatedSocket,
    data: LobbyCreateDto
  ): Promise<WsResponse<ServerPayloads[ServerEvents.LobbyMessage]>> {
    const lobby = await this.lobbyService.create(
      data.mode,
      data.type,
      client.data.name
    );

    if (!lobby) throw new Error("Lobby creation error");
    else this.lobbyService.join(lobby.id, client);

    console.info(
      `Lobby created - ID[${lobby.id}] - Client name[${client.data.name}]`
    );

    return {
      event: ServerEvents.LobbyMessage,
      data: {
        message: "Lobby created",
      },
    };
  }

  @SubscribeMessage(ClientEvents.JoinLobby)
  onJoinLobby(
    client: AuthenticatedSocket,
    data: LobbyJoinDto
  ): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
    this.lobbyService.join(data.lobbyId, client);

    console.info(
      `User - [${client.data.name}] - joined the lobby - [${data.lobbyId}]`
    );

    return {
      event: ServerEvents.LobbyMessage,
      data: {
        message: "Lobby joined",
      },
    };
  }

  @SubscribeMessage(ClientEvents.InviteToLobby)
  onInviteToLobby(
    client: AuthenticatedSocket,
    data: LobbyInviteDto
  ): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
    const lobby = client.data.gameLobby;
    if (!lobby) throw new Error(`No lobby attached to user - [${client.data.name}]`);
    else lobby.inviteClient(client, data.invitedClient);
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
    switch (data.status) {
      case "accepted":
        this.lobbyService.join(data.lobbyId, client);
        break;
      case "declined":
        this.lobbyService.delete(data.lobbyId);
    }
    this.lobbyService.dispatchResponse(data.lobbyId, data.status);
    return {
      event: ServerEvents.InvitationResponse,
      data: {
        message: `Invitation ${data.status}`,
        status: data.status,
      },
    };
  }
}
