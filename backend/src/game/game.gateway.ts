import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ClientEvents } from "../lobby/events/lobby.events";
import { LobbyService } from "../lobby/lobby.service";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { GameLobby } from "../lobby/gameLobby";
import { Server } from "socket.io";

@WebSocketGateway()
export class GameGateway {
  constructor(private readonly lobbyService: LobbyService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ClientEvents.InviteToLobby)
  onInviteToLobby(client: AuthenticatedSocket, data: any) {
    const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
    lobby.invitation();
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
