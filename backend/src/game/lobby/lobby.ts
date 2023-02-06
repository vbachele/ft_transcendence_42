import { v4 } from "uuid";
import { AuthenticatedSocket } from "../types/server.type";
import { Socket, Server } from "socket.io";

export class Lobby {
  public readonly id: string = v4();
  public readonly createdAt: Date = new Date();
  public readonly clients: Map<Socket["id"], AuthenticatedSocket> = new Map<
    Socket["id"],
    AuthenticatedSocket
  >();

  constructor(
    private readonly server: Server,
    public readonly maxClients: number,
  ) {}

}
