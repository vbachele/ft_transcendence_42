import Matter = require("matter-js");
import { Events } from "matter-js";
import { ServerGameEvents } from "./events/game.events";

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  World = Matter.World;

const PLAYGROUND_SIZE = { x: 800, y: 600 };
const PADDLE_SIZE = { x: 20, y: 100 };
const PADDLE_BORDER_SPACING = 20;
const WALL_THICKNESS = 20;
const BALL_SIZE = 1;
const BALL_STARTING_POSTION = {
  x: PLAYGROUND_SIZE.x / 2,
  y: PLAYGROUND_SIZE.y / 2,
};

const enum Wall {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export class Pong {
  public readonly engine: Matter.Engine;
  public readonly runner: Matter.Runner;
  public readonly world: Matter.World;
  public walls: Matter.Body[];
  public ball: Matter.Body;
  public paddles: Matter.Body[];
  private dispatchToLobby: (event: string, data: any) => void;

  constructor(dispatchToLobby: (event: string, data: any) => void) {
    this.dispatchToLobby = dispatchToLobby;
    this.engine = Engine.create({ gravity: { scale: 0 } });
    this.world = this.engine.world;
    this.runner = Runner.create();
    this.createWalls();
    this.createBall();
    this.createPaddles();
  }

  // create walls starting from top in clockwise direction
  private createWalls() {
    this.walls = [
      Bodies.rectangle(
        PLAYGROUND_SIZE.x / 2,
        -(WALL_THICKNESS / 2),
        PLAYGROUND_SIZE.x,
        WALL_THICKNESS,
        { label: "topWall", isStatic: true }
      ),
      Bodies.rectangle(
        PLAYGROUND_SIZE.x + WALL_THICKNESS / 2,
        PLAYGROUND_SIZE.y / 2,
        WALL_THICKNESS,
        PLAYGROUND_SIZE.y,
        { label: "rightWall", isStatic: true }
      ),
      Bodies.rectangle(
        PLAYGROUND_SIZE.x / 2,
        PLAYGROUND_SIZE.y + WALL_THICKNESS / 2,
        PLAYGROUND_SIZE.x,
        WALL_THICKNESS,
        { label: "bottomWall", isStatic: true }
      ),
      Bodies.rectangle(
        -(WALL_THICKNESS / 2),
        PLAYGROUND_SIZE.y / 2,
        WALL_THICKNESS,
        PLAYGROUND_SIZE.y,
        { label: "leftWall", isStatic: true }
      ),
    ];
    World.add(this.world, this.walls);
  }

  private createBall() {
    this.ball = Bodies.circle(
      BALL_STARTING_POSTION.x,
      BALL_STARTING_POSTION.y,
      BALL_SIZE,
      {
        label: "ball",
        inertia: Infinity,
        friction: 0,
        frictionStatic: 0,
        frictionAir: 0,
        restitution: 1,
        render: {
          visible: true,
        },
      }
    );
    World.add(this.world, this.ball);
  }

  private createPaddles() {
    this.paddles = [
      Bodies.rectangle(
        PADDLE_BORDER_SPACING,
        PLAYGROUND_SIZE.y / 2,
        PADDLE_SIZE.x,
        PADDLE_SIZE.y,
        { isStatic: true, label: "leftPaddle" }
      ),
      Bodies.rectangle(
        PLAYGROUND_SIZE.x - PADDLE_BORDER_SPACING,
        PLAYGROUND_SIZE.y / 2,
        PADDLE_SIZE.x,
        PADDLE_SIZE.y,
        { isStatic: true, label: "rightPaddle" }
      ),
    ];
    World.add(this.world, this.paddles);
  }

  private kickoff() {
    Matter.Body.setVelocity(this.ball, { x: 5, y: 5 });
    let prevBallPos = { x: 0, y: 0 };
    Events.on(this.engine, "beforeUpdate", () => {
      if (
        prevBallPos.x !== this.ball.position.x ||
        prevBallPos.y !== this.ball.position.y
      ) {
        this.dispatchToLobby(ServerGameEvents.MoveBall, {
          id: this.ball.id,
          type: this.ball.type,
          position: this.ball.position,
          velocity: this.ball.velocity,
        });
        prevBallPos = { ...this.ball.position };
      }
    });
  }

  private detectPaddleCollision() {
    Events.on(this.engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        if (
          pair.bodyA.label === "leftPaddle" ||
          pair.bodyB.label === "leftPaddle"
        ) {
          this.dispatchToLobby(ServerGameEvents.PaddleHit, {
            position: this.paddles[0].position,
          });
        } else if (
          pair.bodyA.label === "rightPaddle" ||
          pair.bodyB.label === "rightPaddle"
        ) {
          this.dispatchToLobby(ServerGameEvents.PaddleHit, {
            position: this.paddles[1].position,
          });
        }
      }
    });
  }

  public start() {
    Runner.run(this.engine);
    Events.on(this.runner, "afterUpdate", () => {
      console.log("afterUpdate");
    });
    this.kickoff()
    this.detectPaddleCollision();
  }
}
