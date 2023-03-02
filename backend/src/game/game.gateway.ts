import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import {ClientEvents, ServerEvents} from "../lobby/events/lobby.events";
import { AuthenticatedSocket, ServerPayloads } from "../lobby/types/lobby.type";
import { Server } from "socket.io";
import {GameInviteDto, MovePaddleDto} from "./dto/game.dto";
import { ClientGameEvents } from "./events/game.events";
import { GameService } from "./game.service";
import { ValidationPipe } from "@nestjs/common";
import {LobbyService} from "../lobby/lobby.service";

@WebSocketGateway()
export class GameGateway {
  constructor(
    private readonly gameService: GameService,
  ) {}

  @SubscribeMessage(ClientGameEvents.Invite)
  onInviteToLobby(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ValidationPipe()) data: GameInviteDto
  ): WsResponse<ServerPayloads[ServerEvents.LobbyMessage]> {
    console.log(data.invitedClientName);
    this.gameService.invite(client, data.invitedClientName, data.lobbyId);
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
    this.gameService.dispatchInvitationResponse(client, data);
    return {
      event: ServerEvents.LobbyMessage,
      data: {
        message: `Invitation ${data.status}`,
        status: data.status,
      },
    };
  }

  @SubscribeMessage(ClientGameEvents.Ready)
  onReady(
      @ConnectedSocket() client: AuthenticatedSocket
  ) {
    console.info(`Client [${client.data.name}] ready`)
  }

  @SubscribeMessage(ClientGameEvents.MovePaddle)
  onMovePaddle(
      @ConnectedSocket() client: AuthenticatedSocket,
      @MessageBody(new ValidationPipe()) data: MovePaddleDto,
  ) {
    this.gameService.movePaddle(client, data);
  }
}
