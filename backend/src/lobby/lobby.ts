import { v4 } from "uuid";
import { AuthenticatedSocket } from "./types/server.type";
import { Server, Socket } from "socket.io";
import { ServerEvents } from "./events/lobby.events";
import { Instance } from "./instance";
import { Lobby as PrismaLobby } from "@prisma/client";


export class Lobby {
  public readonly clients: Map<
    AuthenticatedSocket["data"]["name"],
    AuthenticatedSocket
  > = new Map<Socket["id"], AuthenticatedSocket>();
  public readonly data: PrismaLobby = {
    id: "",
    createdAt: new Date(),
    adminId: 0,
    type: "game",
  };

  constructor(
    private readonly server: Server,
    public readonly maxClients: number,
    private readonly type: string,
    private readonly instance?: Instance
  ) {
    this.data.id = v4();
    this.data.createdAt = new Date();
    this.data.type = "game";
  }

  fetchSocketID(username: string): string {
    const clients = this.server.sockets;
    let id: string = "";
    clients.sockets.forEach((value) => {
      if (value.data.name === username) {
        id = value.id;
      }
    });
    if (!id) throw new Error(`No socket found for user - [${username}]`);
    return id;
  }

  public addClient(client: AuthenticatedSocket): void {
    this.clients.set(client.data.name, client);
    client.join(this.data.id);
    client.addLobby(this);
    this.dispatchLobbyState();
  }

  public async inviteClient(
    client: AuthenticatedSocket,
    invitedClient: string
  ): Promise<any> {
    try {
      const socketID = this.fetchSocketID(invitedClient);
      this.server
        .to(socketID)
        .timeout(15_000)
        .emit(ServerEvents.InvitedToLobby, {
          invitation: {
            from: client.id,
            lobby: this.data,
          },
        });
      console.log(`Invitation sent to - [${invitedClient}]`);
    } catch (e) {
      console.error(e);
    }
  }

  public removeClient(client: AuthenticatedSocket): void {
    this.clients.delete(client.id);
    client.leave(this.data.id);
  }

  public dispatchLobbyState(): void {
    let clientList: string[] = [];
    this.clients.forEach((value, key) => {
      clientList.push(value.data.name);
    });
    this.dispatchToLobby(ServerEvents.LobbyState, {
      id: this.data.id,
      createdAt: this.data.createdAt,
      createdBy: clientList.at(0),
      type: this.data.type,
      clients: clientList,
    });
  }

  public dispatchToLobby<T>(event: ServerEvents, payload: T): void {
    if (!this.server) throw new Error("Server is undefined");
    this.server.to(this.data.id).emit(event, payload);
  }
}
