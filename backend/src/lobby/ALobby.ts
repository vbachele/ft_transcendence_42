import { AuthenticatedSocket } from "./types/lobby.type";
import { ServerEvents } from "./events/lobby.events";
import { Server, Socket } from "socket.io";
import { v4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { WebsocketGateway } from "../websocket/websocket.gateway";

/**
 * @description This is the base Lobby class. It contains basic functions that are common to lobbies.
 * You can extend this class to customize your own Lobby without having to rewrite the basic functions
 * @remarks This class is the base class of {@link GameLobby} and {@link ChatLobby}
 * @param id uuid generated using the uuid library
 * @param createdAt creation date as a Date object
 * @param server The WebSocketServer. It is used to dispatch lobby state to clients
 * @protected
 */

@Injectable()
export abstract class ALobby {
  protected constructor(
    protected readonly server: Server,
    protected readonly maxClients = 128,

    public id: string = v4(),
    public readonly createdAt = new Date(),
  ) {
  }

  public readonly clients: Map<
    AuthenticatedSocket["data"]["name"],
    AuthenticatedSocket
  > = new Map<Socket["id"], AuthenticatedSocket>();

  public addClient(client: AuthenticatedSocket): ALobby {
    if (this.clients.size >= this.maxClients)
      throw new Error(`Max clients reached for this lobby`)
    this.clients.set(client.data.name, client);
    client.join(this.id);
    this.dispatchLobbyState();
    return this;
  }

  public removeClient(client: AuthenticatedSocket): ALobby {
    this.clients.delete(client.id);
    client.leave(this.id);
    return this;
  }

  public dispatchLobbyState(): void {
    let clientList: string[] = [];
    this.clients.forEach((value, key) => {
      clientList.push(value.data.name);
    });
    this.dispatchToLobby(ServerEvents.LobbyState, {
      id: this.id,
      createdAt: this.createdAt,
      createdBy: clientList.at(0),
      clients: clientList,
    });
  }

  public dispatchToLobby<T>(event: any, payload: T): void {
    if (!this.server) throw new Error("Server is undefined");
    this.server.to(this.id).emit(event, payload);
  }
}
