import { GameLobby, GameLobbyDto } from "./gameLobby";
import { ChatLobby, ChatLobbyDto } from "./chatLobby";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { LobbyDto } from "./dto/lobby.dto";
import { WebsocketService } from "../websocket/websocket.service";

/**
 * This is the lobby factory. It returns a lobby based on the type specified in the payload.
 * If the type doesn't exist, throw an error
 */
export const factory = {
  provide: "LOBBY_FACTORY",
  useFactory: (
    prismaLobbyService: PrismaLobbyService,
    websocketService: WebsocketService
  ): any => {
    return {
      create: function (payload: LobbyDto): GameLobby | ChatLobby {
        switch (payload.type) {
          case "game": {
            return new GameLobby(
              payload.data as GameLobbyDto,
              websocketService
            );
          }
          case "chat":
            return new ChatLobby(
              payload.data as ChatLobbyDto,
              prismaLobbyService,
              websocketService
            );
          default:
            throw new Error(`Lobby type ${payload.type} doesn't exist`);
        }
      },
    };
  },
  inject: [PrismaLobbyService, WebsocketService],
};
