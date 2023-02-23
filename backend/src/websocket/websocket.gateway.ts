import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";
import { AuthenticatedSocket } from "src/lobby/types/server.type";

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  public users: Map<string, string> = new Map<string, string>();

  async handleConnection(
    @ConnectedSocket() client: AuthenticatedSocket,
    ...args: any[]
  ) {
    client.data.name = client.handshake.query.name as string;
    console.info(`Connected - Client Name [${client.data.name}]`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.info(`Disconnected - Client ID [${client.data.name}]`);

    const name = this.GetNameFromSocketId(client.id);
    if (name) {
      this.users.delete(name);
      const users = Object.keys(this.users);
      this.SendMessage(
        "user_disconnected",
        users.filter((name) => name !== client.data.name),
        users
      );
    }
  }

  @SubscribeMessage("handshake")
  handleHandshake(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string
  ) {
    console.info(`Handshake received from [${client.data.name}]`);

    const reconnected = Object.values(this.users).includes(client.id);

    if (reconnected) {
      console.info(`User [${client.data.name}] has reconnected`);
      const name = this.GetNameFromSocketId(client.id);
      if (name) {
        return;
      }
    }

    this.users.set(client.data.name, client.id);
    const users = Object.keys(this.users);

    console.info("Sending callback for handshake...");
    this.server.to(client.id).emit("handshake", client.data.name, users);
    this.SendMessage(
      "user_connected",
      users.filter((name) => name !== client.data.name),
      users
    );
  }

  GetNameFromSocketId = (id: string) => {
    return [...this.users.keys()].find((key) => key.includes(id));
  };

  SendMessage = (name: string, users: string[], payload?: Object) => {
    console.info(`Emitting event: ` + name + ` to `, users);
    users.forEach((username) =>
      payload
        ? this.server.to(this.users.get(username) as string).emit(name, payload)
        : this.server.to(this.users.get(username) as string).emit(name)
    );
  };
}
