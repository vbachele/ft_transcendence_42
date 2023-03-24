import { Inject, Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "./types/lobby.type";
import { ALobby } from "./ALobby";
import { Server } from "socket.io";
import {WebSocketServer, WsException} from '@nestjs/websockets';
import { TLobbyDto } from "./dto/lobby.dto";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import {ChatLobby, ChatLobbyDto} from '../chat/chatLobby';

/**
 * @brief This service manage all the lobby instances on the server
 * @param lobbyCreator The factory used to create different lobby types
 * @member lobbies The list of lobbies accessible via their ids
 */
@Injectable()
export class LobbyService {
  constructor(
    @Inject("LOBBY_FACTORY") private readonly lobbyCreator: any,
    private readonly prismaLobbyService: PrismaLobbyService
  ) {}

  private readonly lobbies: Map<ALobby["id"], ALobby> = new Map<
    ALobby["id"],
    ALobby
  >();

  @WebSocketServer()
  server: Server;

  /**
   * @brief Load all the lobbies from the database when the server starts
   */
  async loadLobbies() {
    const lobbies = await this.prismaLobbyService.fetchLobbies();
    lobbies.forEach((lobby) => {
      const data = {
        id: lobby.id,
        maxClients: lobby.maxClients,
        privacy: lobby.privacy,
        createdAt: lobby.createdAt,
        init: false,
      };
      this.lobbies.set(
        lobby.id,
        this.lobbyCreator.create({ type: "chat", data: data })
      );
      console.info(`Loaded lobby - [${lobby.id}]`);
    });
  }

  public getLobby(lobbyId: string): ALobby {
    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) throw new WsException(`Lobby [${lobbyId}] doesn't exist`);
    return lobby;
  }

  public async create(type: string, payload: TLobbyDto): Promise<ALobby> {
    const lobby = this.lobbyCreator.create({ type: type, data: payload }) as ALobby;
    if (type === "chat") {
      await (lobby as ChatLobby).init(payload as ChatLobbyDto);
    }
    this.lobbies.set(lobby.id, lobby);
    return lobby;
  }

  public join(lobbyId: string, client: AuthenticatedSocket) {
    const lobby = this.getLobby(lobbyId);
    lobby.addClient(client);
    console.info(`Client [${client.data.name}] joined lobby [${lobbyId}]`);
  }

  public leave(lobbyId: string, client: AuthenticatedSocket) {
    const lobby = this.getLobby(lobbyId);
    lobby.removeClient(client);
    console.info(`Client [${client.data.name}] left lobby [${lobbyId}]`);
  }

  public delete(lobbyId: string) {
    this.lobbies.delete(lobbyId);
    console.info(`Lobby [${lobbyId}] deleted`);
  }
}
