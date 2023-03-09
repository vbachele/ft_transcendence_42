import { ALobby } from "./ALobby";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { IsString } from "class-validator";
import { AuthenticatedSocket } from "./types/lobby.type";
import { WebsocketService } from "../websocket/websocket.service";
import { ConnectedSocket } from "@nestjs/websockets";
import { ServerGameEvents } from "../game/events/game.events";
import { Pong } from "../game/pong";
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
    this.instance = new Pong();
  }

  runGame() {
    this.instance.start();
    Matter.Body.setVelocity(this.instance.ball, { x: 5, y: 5 });
    let prevBallPos = { x: 0, y: 0 };
    Events.on(this.instance.engine, "beforeUpdate", () => {
      if (
        prevBallPos.x !== this.instance.ball.position.x ||
        prevBallPos.y !== this.instance.ball.position.y
      ) {
        this.dispatchToLobby(ServerGameEvents.MoveBall, {
          id: this.instance.ball.id,
          type: this.instance.ball.type,
          position: this.instance.ball.position,
          velocity: this.instance.ball.velocity,
        });
        prevBallPos = { ...this.instance.ball.position };
      }
    });
    Events.on(this.instance.engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        if (
          pair.bodyA.label === "leftPaddle" ||
          pair.bodyB.label === "leftPaddle"
        ) {
          this.dispatchToLobby(ServerGameEvents.PaddleHit, {
            position: this.instance.paddles[0].position,
          });
        } else if (
          pair.bodyA.label === "rightPaddle" ||
          pair.bodyB.label === "rightPaddle"
        ) {
          this.dispatchToLobby(ServerGameEvents.PaddleHit, {
            position: this.instance.paddles[1].position,
          });
        }
      }
    });
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
      throw new ForbiddenException(`The client doesn't belong to the lobby`);
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
