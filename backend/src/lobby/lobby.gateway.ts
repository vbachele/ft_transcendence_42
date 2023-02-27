import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { ClientEvents, ServerEvents } from "./events/lobby.events";
import { LobbyService } from "./lobby.service";
import { AuthenticatedSocket, ServerPayloads } from "./types/server.type";
import { Server } from "socket.io";
import { LobbyValidationPipe } from "./lobby.creator";
import {LobbyDto} from "./dtos/lobby.dto";

@WebSocketGateway()
export class LobbyGateway {
  @WebSocketServer()
  server: Server;

  constructor(protected readonly lobbyService: LobbyService) {}

  @SubscribeMessage(ClientEvents.CreateLobby)
  onCreateLobby(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new LobbyValidationPipe()) body: LobbyDto
  ): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
    const lobby = this.lobbyService.create(body.type, body.data);
    if (!lobby) throw new Error("Lobby creation error");
    else this.lobbyService.join(lobby.id, client);

    console.info(
      `Lobby created - ID[${lobby.id}] - Client name[${client.data.name}]`
    );

    return {
      event: ServerEvents.LobbyMessage,
      data: {
        message: "Lobby creation",
        status: "created",
        lobbyId: lobby.id,
      },
    };
  }

  @SubscribeMessage(ClientEvents.JoinLobby)
  onJoinLobby(
    client: AuthenticatedSocket,
    data: any
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

  // @SubscribeMessage(ClientEvents.InviteToLobby)
  // onInviteToLobby(
  //   client: AuthenticatedSocket,
  //   data: LobbyInviteDto
  // ): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
  //   const lobby = client.data.gameLobby;
  //   if (!lobby) throw new Error(`No lobby attached to user - [${client.data.name}]`);
  //   else lobby.inviteClient(client, data.invitedClient);
  //   return {
  //     event: ServerEvents.LobbyMessage,
  //     data: {
  //       message: `Invitation sent`,
  //     },
  //   };
  // }

  // @SubscribeMessage(ClientEvents.InvitationResponse)
  // onInvitationResponse(
  //   client: AuthenticatedSocket,
  //   data: any
  // ): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
  //   console.log(data);
  //   switch (data.status) {
  //     case "accepted":
  //       this.lobbyService.join(data.lobbyId, client);
  //       break;
  //     case "declined":
  //       this.lobbyService.delete(data.lobbyId);
  //   }
  //   this.lobbyService.dispatchResponse(data.lobbyId, data.status);
  //   return {
  //     event: ServerEvents.InvitationResponse,
  //     data: {
  //       message: `Invitation ${data.status}`,
  //       status: data.status,
  //     },
  //   };
  // }
}
