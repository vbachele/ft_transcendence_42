import { Injectable } from "@nestjs/common";
import { LobbyCreateDto } from "./dtos/lobby.dto";
import { Server } from "socket.io";
import { ConnectedSocket } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { v4 } from "uuid";
import { AuthenticatedSocket } from "../types/server.type";
import { Lobby } from "./lobby";

@Injectable()
export class LobbyService {
  private readonly lobbies: Map<Lobby["id"], Lobby> = new Map<
    Lobby["id"],
    Lobby
  >();
  public server: Server;

  public initializeSocket(client: AuthenticatedSocket): void {
    client.data.lobby = null;
  }

  public terminateSocket(client: AuthenticatedSocket): void {}

  public create(mode: string): Lobby {
    let maxClients = 2;
    switch (mode) {
      case "solo":
        maxClients = 1;
        break;
      case "duo":
        maxClients = 2;
    }
    console.log(`SERVER IS ${this.server}`);
    const lobby = new Lobby(this.server, maxClients);
    this.lobbies.set(lobby.id, lobby);
    return lobby;
  }

  public join(lobbyId: string, client: AuthenticatedSocket): void {
    const lobby = this.lobbies.get(lobbyId);
    if (!lobbyId)
      throw new Error("Lobby doesn't exist");
    else
      lobby?.addClient(client);
  }
}
