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

  async sendMessage(content: string, lobbyId: string, username: string) {
    const lobby = this.lobbyService.getLobby(lobbyId);
    const message = await this.prismaLobbyService.pushMessage(lobbyId, content, username);
    lobby.dispatchToLobby(ServerChatEvents.IncomingMessage, {message: message.messages[message.messages.length - 1]});
    console.info(`Message sent - [${message}] - to lobby [${lobbyId}]`);
  }

  public async joinLobbies(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobbies = await this.prismaLobbyService.lobbiesFromUserName(
      client.data.name
    );
    lobbies?.lobbies.forEach((lobbyModel) => {
      const lobby = this.lobbyService.getLobby(lobbyModel.id);
      lobby.addClient(client);
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