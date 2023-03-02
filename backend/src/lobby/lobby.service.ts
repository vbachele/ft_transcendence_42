import { Inject, Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "./types/lobby.type";
import { ALobby } from "./ALobby";
import { Server } from "socket.io";
import { WebSocketServer } from "@nestjs/websockets";
import {TLobbyDto} from "./dto/lobby.dto";

/**
 * @brief This service manage all the lobby instances on the server
 * @param lobbyCreator The factory used to create different lobby types
 * @member lobbies The list of lobbies accessible via their ids
 */
@Injectable()
export class LobbyService {

  constructor(@Inject("LOBBY_FACTORY") private readonly lobbyCreator: any) {}

  private readonly lobbies: Map<ALobby["id"], ALobby> = new Map<
    ALobby["id"],
    ALobby
  >();

  @WebSocketServer()
  server: Server;

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
    console.info(`Client [${client.data.name}] joined lobby [${lobbyId}]`);
  }

  public leave(lobbyId: string, client: AuthenticatedSocket) {
    const lobby = this.getLobby(lobbyId);
    lobby.removeClient(client);
    console.info(`Client [${client.data.name}] left lobby [${lobbyId}]`)
  }

  public delete(lobbyId: string) {
    this.lobbies.delete(lobbyId);
    console.info(`Lobby [${lobbyId}] deleted`);
  }
}
