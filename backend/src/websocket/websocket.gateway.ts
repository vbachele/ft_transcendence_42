import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { MessageBody } from "@nestjs/websockets";
import { randomUUID } from "crypto";

import { Server, Socket } from "socket.io";

import { v4 } from "uuid";
import { SessionStoreService } from "./websocket.service";

@WebSocketGateway({ cors: true, origin: "*" })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  public users: { [uid: string]: string };

  constructor(protected readonly sessionStoreService: SessionStoreService) {
    this.users = {};
  }

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    console.info(`Connected - Client ID [${client.id}]`);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.info(`Disconnected - Client ID [${client.id}]`);

    const uid = this.GetUidFromSocketId(client.id);
    if (uid) {
      delete this.users[uid];
      const users = Object.values(this.users);
      this.SendMessage(
        "user_disconnected",
        users.filter((id) => id !== client.id),
        users
      );
    }
  }

  @SubscribeMessage("handshake")
  handleHandshake(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string
  ) {
    console.info(`Handshake received from `, client.id);
    console.log(typeof data);

    const reconnected = Object.values(this.users).includes(client.id);

    if (reconnected) {
      console.info(`This user has reconnected`);
      const uid = this.GetUidFromSocketId(client.id);
      const users = Object.values(this.users);

      if (uid) {
        console.info(`Sending callback for reconnect...`);
        // eval(data)(uid, users);
        return;
      }
    }

    const uid = v4();
    this.users[uid] = client.id;
    const users = Object.values(this.users);

    console.info("Sending callback for handshake...");
    this.server.to(client.id).emit("handshake", uid, users);
    this.SendMessage(
      "user_connected",
      users.filter((id) => id !== client.id),
      users
    );
  }
  GetUidFromSocketId = (id: string) =>
    Object.keys(this.users).find((uid) => this.users[uid] === id);

  SendMessage = (name: string, users: string[], payload?: Object) => {
    console.info(`Emitting event: ` + name + ` to `, users);
    users.forEach((id) =>
      payload
        ? this.server.to(id).emit(name, payload)
        : this.server.to(id).emit(name)
    );
  };
}
