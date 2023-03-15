import { WebsocketGateway } from "../websocket/websocket.gateway";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { LobbyService } from "../lobby/lobby.service";
import { ServerGameEvents } from "./events/game.events";
import { ServerEvents } from "../lobby/events/lobby.events";
import { MovePaddleDto } from "./dto/game.dto";
import { GameLobby } from "../lobby/gameLobby";
import { ConnectedSocket } from "@nestjs/websockets";

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
          console.log(`declined`);
          this.lobbyService.delete(data.lobby.id);
      }
    }, 1_000);
  }

  public gameSetup(
    @ConnectedSocket() client: AuthenticatedSocket,
    lobbyId: string
  ) {
    const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
    lobby.validateClient(client);
    lobby.dispatchGameSetup();
  }

  public runGame(lobbyId: string) {
    const lobby = this.lobbyService.getLobby(lobbyId) as GameLobby;
    lobby.runGame();
    console.info(`Game started in lobby [${lobbyId}]`);
  }

  public movePaddle(client: AuthenticatedSocket, data: MovePaddleDto) {
    const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
    lobby.validateClient(client);
    lobby.movePaddle(client, client.data.paddle, data.direction);
  }

  public moveBall(client: AuthenticatedSocket, data: any) {
    const lobby = this.lobbyService.getLobby(data.lobbyId) as GameLobby;
    lobby.validateClient(client);
    const isInLobby = lobby.clients.get(client.data.name);
    if (!isInLobby)
      throw new ForbiddenException(
        `You're not authorized to access this lobby`
      );
    lobby.dispatchToOpponent(client, ServerGameEvents.MoveBall, {
      x: data.x,
      y: data.y,
    });
  }
}
