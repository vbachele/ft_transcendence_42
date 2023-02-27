import { v4 } from "uuid";
import { AuthenticatedSocket } from "../types/server.type";
import { Socket, Server } from "socket.io";
import { ClientEvents, ServerEvents } from "../events/game.events";

export class Lobby {
  public readonly id: string = v4();
  public readonly createdAt: Date = new Date();
  public readonly clients: Map<Socket["id"], AuthenticatedSocket> = new Map<
    Socket["id"],
    AuthenticatedSocket
  >();

  constructor(
    private readonly server: Server,
    public readonly maxClients: number
  ) {}

  public addClient(client: AuthenticatedSocket): void {
    this.clients.set(client.id, client);
    client.join(this.id);
    client.data.lobby = this;
    console.info(`Client - [${client.id}] added to lobby - [${this.id}]`);
    this.dispatchLobbyState();
  }

  public async inviteClient(
    client: AuthenticatedSocket,
    invitedClient: string
  ): Promise<any> {
    this.server
      .to(invitedClient)
      .timeout(15_000)
      .emit(ServerEvents.InvitedToLobby, {
        invitation: {
          from: client.id,
          lobby: this.id,
        },
      });
  }

  public removeClient(client: AuthenticatedSocket): void {
    this.clients.delete(client.id);
    client.leave(this.id);
    client.data.lobby = null;
  }

  public dispatchLobbyState(): void {
    let clientList: string[] = [];
    this.clients.forEach((value, key) => {
      clientList.push(value.id);
    });
    this.dispatchToLobby(ServerEvents.LobbyState, {
      id: this.id,
      createdAt: this.createdAt,
      createdBy: clientList.at(0),
      clients: clientList,
    });
  }

  public dispatchToLobby<T>(event: ServerEvents, payload: T): void {
    if (!this.server) throw new Error("Server is undefined");
    this.server.to(this.id).emit(event, payload);
  }
}
