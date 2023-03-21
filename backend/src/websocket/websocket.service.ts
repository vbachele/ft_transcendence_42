import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { ConnectedSocket } from "@nestjs/websockets";

@Injectable()
export class WebsocketService {
  constructor() {}

  public server: Server;
  public clients: Map<string, AuthenticatedSocket> = new Map<
    string,
    AuthenticatedSocket
  >();

  public getClient(username: string): AuthenticatedSocket | undefined {
    return this.clients.get(username);
  }

  public addUser(@ConnectedSocket() client: AuthenticatedSocket) {
    this.clients.set(client.data.name, client);
  }

  public removeUser(@ConnectedSocket() client: AuthenticatedSocket) {
    this.clients.delete(client.data.name);
  }

  public sendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    event: string,
    payload?: Object
  ) {
    console.info(`Emitting event [${event}] to connected clients`);
    payload
      ? client.broadcast.emit(event, payload)
      : client.broadcast.emit(event);
  }
}
