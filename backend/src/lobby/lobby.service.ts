import { Inject, Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "./types/server.type";
import { ALobby } from "./ALobby";
import { Server } from "socket.io";
import { WebSocketServer } from "@nestjs/websockets";
import {TLobbyDto} from "./dtos/lobby.dto";

@Injectable()
export class LobbyService {
  private readonly lobbies: Map<ALobby["id"], ALobby> = new Map<
    ALobby["id"],
    ALobby
  >();

  @WebSocketServer()
  server: Server;

  constructor(@Inject("LOBBY_FACTORY") private readonly lobbyCreator: any) {}

  public getLobby(lobbyId: string): ALobby {
    console.log(`Get lobbies = `, this.lobbies.keys());
    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) throw new Error(`Lobby [${lobbyId}] doesn't exist`);
    return lobby;
  }

  public create(type: string, payload: TLobbyDto): ALobby {
    const lobby = this.lobbyCreator.create({ type: type, data: payload });
    this.lobbies.set(lobby.id, lobby);
    return lobby;
  }

  public join(lobbyId: string, client: AuthenticatedSocket) {
    const lobby = this.getLobby(lobbyId);
    lobby.addClient(client);
  }

  public leave(lobbyId: string, client: AuthenticatedSocket) {
    const lobby = this.getLobby(lobbyId);
    lobby.removeClient(client);
  }
}
