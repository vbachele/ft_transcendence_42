import { ALobby } from "../lobby/ALobby";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { IsString } from "class-validator";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { WebsocketService } from "../websocket/websocket.service";
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import { ServerGameEvents } from "./events/game.events";
import { Pong } from "./pong";
import Matter = require("matter-js");
import { Events } from "matter-js";
import { serialize } from "class-transformer";

export class GameLobbyDto {
  @IsString()
  mode: string;
}

@Injectable()
export class GameLobby extends ALobby {
  data: GameLobbyDto;
  instance: Pong;

  constructor(
    data: GameLobbyDto,
    private readonly websocketService: WebsocketService
  ) {
    super(websocketService.server, 2);
    this.data = data;
    this.instance = new Pong(this.dispatchToLobby.bind(this));
  }

  runGame() {
    this.instance.start();
  }

  movePaddle(
    @ConnectedSocket()
    client: AuthenticatedSocket,
    paddle: Matter.Body,
    direction: string
  ) {
    switch (direction) {
      case "up":
        Matter.Body.setPosition(paddle, {
          x: paddle.position.x,
          y: paddle.position.y - 5,
        });
        break;
      case "down":
        Matter.Body.setPosition(paddle, {
          x: paddle.position.x,
          y: paddle.position.y + 5,
        });
        break;
    }
    this.dispatchToLobby(ServerGameEvents.MovePaddle, {
      id: paddle.id,
      type: paddle.type,
      position: paddle.position,
    });
  }

  serializeBody(body: Matter.Body) {
    return JSON.stringify(body, (key, value) =>
      key === "parent" || key === "parts" || key === "body" ? undefined : value
    );
  }

  dispatchGameSetup() {
    const clients = [...this.clients.values()];
    let bodies: string[] = [];
    Matter.Composite.allBodies(this.instance.world).forEach((body) =>
      bodies.push(this.serializeBody(body))
    );
    clients[0].data.paddle = this.instance.paddles[0];
    clients[1].data.paddle = this.instance.paddles[1];
    this.server.to(clients[0].id).emit(ServerGameEvents.Setup, bodies);
    this.server.to(clients[1].id).emit(ServerGameEvents.Setup, bodies);
    console.info(`Game setup dispatched to lobby`);
  }

  validateClient(
    @ConnectedSocket()
    client: AuthenticatedSocket
  ) {
    if (!this.clients.has(client.data.name))
      throw new WsException(`Client [${client.data.name}] doesn't belong to the lobby`);
  }

  dispatchToOpponent<T>(
    @ConnectedSocket()
    client: AuthenticatedSocket,
    event: ServerGameEvents,
    payload: T
  ) {
    const opponents = [...this.clients.values()].filter(
      (socket) => socket.data.name !== client.data.name
    );
    opponents.forEach((opponent) => {
      payload
        ? this.server.to(opponent.id).emit(event, payload)
        : this.server.to(opponent.id).emit(event);
    });
  }
}
