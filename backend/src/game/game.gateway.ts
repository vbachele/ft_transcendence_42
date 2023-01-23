import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { WebsocketGateway } from "src/websocket/websocket.gateway";
import { ClientEvents } from "./game.events";
import { TClientPayloads } from "./game.types";

@WebSocketGateway()
export class GameGateway extends WebsocketGateway {
  constructor() {
    super();
  }

  @SubscribeMessage(ClientEvents.PaddlePosition)
  onPaddlePosition(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ): WsResponse<TClientPayloads> {
    return {
      event: ClientEvents.PaddlePosition,
      data: data,
    };
  }
}
