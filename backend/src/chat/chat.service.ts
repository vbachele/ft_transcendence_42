import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { LobbyService } from "../lobby/lobby.service";
import { ConnectedSocket } from "@nestjs/websockets";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { Lobby as LobbyModel } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { ServerChatEvents } from "./events/chat.events";

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaLobbyService: PrismaLobbyService,
    private readonly lobbyService: LobbyService
  ) {}

  async sendMessage(message: string, lobbyId: string) {
    const lobby = this.lobbyService.getLobby(lobbyId);
    await this.prismaLobbyService.pushMessage(lobbyId, message);
    lobby.dispatchToLobby(ServerChatEvents.IncomingMessage, {message: message, lobbyId: lobbyId});
    console.info(`Message sent - [${message}] - to lobby [${lobbyId}]`);
  }

  public async joinLobbies(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobbies = await this.prismaLobbyService.lobbiesFromUserName(
      client.data.name
    );
    lobbies?.Lobbies.forEach((lobbyModel) => {
      const lobby = this.lobbyService.getLobby(lobbyModel.id);
      lobby.addClient(client);
      console.log(
        `Client [${client.data.name}] joined lobby [${lobbyModel.id}]`
      );
    });
  }

  public async fetchLobbies(username: string): Promise<LobbyModel[]> {
    const publicLobbies = await this.prismaLobbyService.fetchPublicLobbies();
    const privateLobbies = await this.prismaLobbyService.fetchPrivateLobbies(
      username
    );
    return publicLobbies.concat(privateLobbies);
  }
}