import { v4 } from "uuid";
import { AuthenticatedSocket } from "../types/server.type";
import { Socket, Server } from "socket.io";
import { ServerEvents } from "../events/game.events";

const withTimeout = (
  onSuccess: Function,
  onTimeout: Function,
  timeout: number
) => {
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args: any[]) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    onSuccess.apply(this, args);
  };
};

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
    this.dispatchLobbyState();
  }

  public inviteClient(
    client: AuthenticatedSocket,
    invitedClient: string
  ): void {
    this.server.to(invitedClient).timeout(15_000).emit(
      ServerEvents.InvitedToLobby,
      {
        invitation: {
          from: client.id,
        },
      },
      (error: any, response: any) => {
        if (error)
          console.log(`error`);
          this.server.to(client.id).emit(ServerEvents.InvitationDeclined)
        if (response && response[0])
          console.log(response[0].status);
      }
    );
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
