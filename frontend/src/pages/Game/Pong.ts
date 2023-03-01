import Matter, { Engine } from 'matter-js'
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

let PLAYGROUND_SIZE = {x: 600, y: 600};
const PADDLE_BORDER_SPACING = 40;
const PADDLE_SIZE = {x: 20, y: 100};
const PADDLE_SPEED = 8;

export class Pong {
    Engine = Matter.Engine;
    Render = Matter.Render;
    Runner = Matter.Runner;
    Body = Matter.Body;
    Bodies = Matter.Bodies;
    Composite = Matter.Composite;

    render: Matter.Render;
    runner: Matter.Runner;
    leftPaddle: Matter.Body;
    rightPaddle: Matter.Body;
    floor: Matter.Body;
    ball: Matter.Body;
    engine: Matter.Engine;
    canvas: HTMLCanvasElement;
    keySet: Set<String>;
    keyHandlers: Map<String, Function>;
    socket: Socket;

    constructor(canvas: HTMLCanvasElement, socket: Socket) {
        this.canvas = canvas;
        this.socket = socket;
        this.engine = this.Engine.create();
        canvas.height = canvas.width * 0.80;
        this.render = this.Render.create({
            canvas: this.canvas,
            options: {
                width: this.canvas.width,
                height: this.canvas.height,
            },
            engine: this.engine,
        });
        PLAYGROUND_SIZE = {x: this.canvas.width, y: this.canvas.height};
        const LEFT_PADDLE_POS = {x: 0 + PADDLE_BORDER_SPACING, y: PLAYGROUND_SIZE.y / 2};
        const RIGHT_PADDLE_POS = {x: PLAYGROUND_SIZE.x - PADDLE_BORDER_SPACING, y: PLAYGROUND_SIZE.y / 2};

        this.leftPaddle = this.Bodies.rectangle(LEFT_PADDLE_POS.x, LEFT_PADDLE_POS.y, PADDLE_SIZE.x, PADDLE_SIZE.y, {
            isStatic: true,
        });
        this.rightPaddle = this.Bodies.rectangle(RIGHT_PADDLE_POS.x, RIGHT_PADDLE_POS.y, PADDLE_SIZE.x, PADDLE_SIZE.y, {
            isStatic: true,
        });
        this.floor = this.Bodies.rectangle(PLAYGROUND_SIZE.x / 2, PLAYGROUND_SIZE.y + 10, PLAYGROUND_SIZE.x, 20, {
            isStatic: true,
        });
        this.ball = this.Bodies.circle(200, 0, 20, {isStatic: true});
        // socket.emit('ball_position'); 
        // socket.on('ball', (ball: Matter.Body) => {
        //     this.ball = ball;
        // })
        this.Composite.add(this.engine.world, [this.leftPaddle, this.rightPaddle, this.floor, this.ball]);
        this.runner = this.Runner.create();
        this.keySet = new Set<String>();
        this.keyHandlers = new Map<string, Function>();
        this.initPaddleController();
    }

    initPaddleController() {
        this.keyHandlers.set('ArrowUp', () => {
            this.move('UP');
            });
        this.keyHandlers.set('ArrowDown', () => {
            this.move('DOWN');
            });
    }

    move(direction: string): void {
        switch (direction) {
            case 'UP':
                if (this.leftPaddle.position.y - (PADDLE_SPEED + PADDLE_SIZE.y / 2) >= 0)
                    this.Body.setPosition(this.leftPaddle, {x: this.leftPaddle.position.x, y: this.leftPaddle.position.y - PADDLE_SPEED}); break;
            case 'DOWN':
                if (this.leftPaddle.position.y + (PADDLE_SPEED + PADDLE_SIZE.y / 2) <= PLAYGROUND_SIZE.y)
                    this.Body.setPosition(this.leftPaddle, {x: this.leftPaddle.position.x, y: this.leftPaddle.position.y + PADDLE_SPEED}); break;
        }
        this.socket.emit("position", this.leftPaddlePosition());
    }

    paddleController() {
        this.canvas.addEventListener('keydown', event => {
            this.keySet.add(event.code);
        })
        this.canvas.addEventListener('keyup', event => {
            this.keySet.delete(event.code);
        })
        Matter.Events.on(this.engine, "beforeUpdate", event => {
            [...this.keySet].forEach(key => {
                this.keyHandlers.get(key)?.();
            })
        })
    }

    leftPaddlePosition() {
        return {x: this.leftPaddle.position.x, y: this.leftPaddle.position.y};
    }

    movePaddle(pos: any) {
        this.Body.setPosition(this.leftPaddle, {x: pos.x, y: pos.y});
    }

    run(): void {
        this.Render.run(this.render);
        this.Runner.run(this.runner, this.engine);
        // Engine.update(this.engine, 1000 / 60);
    }
}