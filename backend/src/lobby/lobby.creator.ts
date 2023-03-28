import { GameLobby, GameLobbyDto } from "../game/gameLobby";
import { ChatLobby, ChatLobbyDto } from "../chat/chatLobby";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { LobbyDto } from "./dto/lobby.dto";
import { WebsocketService } from "../websocket/websocket.service";
import {PrismaService} from '../database/prisma.service';

/**
 * This is the lobby factory. It returns a lobby based on the type specified in the payload.
 * If the type doesn't exist, throw an error
 */
export const factory = {
  provide: "LOBBY_FACTORY",
  useFactory: (
    prismaLobbyService: PrismaLobbyService,
    websocketService: WebsocketService,
    prismaService: PrismaService,
  ): any => {
    return {
      create: function (payload: LobbyDto): GameLobby | ChatLobby {
        switch (payload.type) {
          case "game": {
            return new GameLobby(
              payload.data as GameLobbyDto,
              websocketService,
              prismaService
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
  inject: [PrismaLobbyService, WebsocketService, PrismaService],
};
