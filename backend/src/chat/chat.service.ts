import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { LobbyService } from "../lobby/lobby.service";
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { Lobby as LobbyModel } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { ServerChatEvents } from "./events/chat.events";
import {WebsocketService} from '../websocket/websocket.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaLobbyService: PrismaLobbyService,
    private readonly lobbyService: LobbyService,
    private readonly websocketService: WebsocketService,
  ) {}

  async sendMessage(content: string, lobbyId: string, username: string) {
    const lobby = this.lobbyService.getLobby(lobbyId);
    const message = await this.prismaLobbyService.pushMessage(lobbyId, content, username);
    lobby.dispatchToLobby(ServerChatEvents.IncomingMessage, {message: message.messages[message.messages.length - 1]});
    console.info(`Message sent - [${message}] - to lobby [${lobbyId}]`);
  }

  /**
   * @Description When client reconnects, rejoin all the lobbies he was in
   * @param client - the client that reconnected
   */
  public async joinLobbies(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobbies = await this.prismaLobbyService.lobbiesFromUserName(
      client.data.name
    );
    lobbies?.lobbies.forEach((lobbyModel) => {
      const lobby = this.lobbyService.getLobby(lobbyModel.id);
      lobby.addClient(client);
    });
  }

  /**
   * @Description Fetch all the lobbies the user is in
   * @param username - the username of the user
   */
  public async fetchLobbies(username: string): Promise<LobbyModel[]> {
    const publicLobbies = await this.prismaLobbyService.fetchPublicLobbies();
    const privateLobbies = await this.prismaLobbyService.fetchPrivateLobbies(
      username
    );
    return publicLobbies.concat(privateLobbies);
  }

  public async banUser(userToBan: string, lobbyId: string) {
    try {
      const lobby = await this.prismaLobbyService.addToBannedList(userToBan, lobbyId);
      const bannedUser = this.websocketService.getClient(userToBan);
      if (!bannedUser) throw new WsException(`User ${userToBan} not found`);
      this.websocketService.server.to(bannedUser.id).emit(ServerChatEvents.UserBanned, {
        message: `You have been banned from lobby ${lobby.name}`,
        lobby: lobby,
      });
    }
    catch (e) {
      throw new WsException(`Error when trying to ban user: ` + e.message);
    }
  }
}