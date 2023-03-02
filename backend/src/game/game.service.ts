import { WebsocketGateway } from "../websocket/websocket.gateway";
import {ForbiddenException, Injectable} from "@nestjs/common";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { LobbyService } from "../lobby/lobby.service";
import { ServerGameEvents } from "./events/game.events";
import { ServerEvents } from "../lobby/events/lobby.events";
import {MovePaddleDto} from "./dto/game.dto";
import {GameLobby} from "../lobby/gameLobby";

@Injectable()
export class GameService {
  constructor(
    private readonly websocketGateway: WebsocketGateway,
    private readonly lobbyService: LobbyService
  ) {}

  public invite(
    client: AuthenticatedSocket,
    invitedClientName: string,
    lobbyId: string
  ) {
    const invitedClient = this.websocketGateway.getClient(invitedClientName);
    console.log(`invited client socket id`, invitedClient.id);
    this.websocketGateway.server
      .to(invitedClient.id)
      .emit(ServerGameEvents.Invitation, {
        lobby: { id: lobbyId, type: "game" },
      });
  }

  public dispatchInvitationResponse(client: AuthenticatedSocket, data: any) {
    console.log(`IN dispatch `, data);
    const lobby = this.lobbyService.getLobby(data.lobby.id);
    lobby.dispatchToLobby(ServerEvents.InvitationResponse, {
      response: data.status,
      lobby: data.lobby,
    });
    setTimeout(() => {
      switch (data.status) {
        case "accepted":
          this.lobbyService.join(data.lobby.id, client);
          break;
        case "declined":
          console.log(`declined`)
          this.lobbyService.delete(data.lobby.id);
      }
    }, 1_000);
  }

  public movePaddle(client: AuthenticatedSocket, data: MovePaddleDto) {
    const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
    lobby.validateClient(client);
    const isInLobby = lobby.clients.get(client.data.name);
    if (!isInLobby) throw new ForbiddenException(`You're not authorized to access this lobby`);
    lobby.dispatchToLobby(ServerGameEvents.MovePaddle, {
      x: data.x,
      y: data.y,
    })
  }
}
