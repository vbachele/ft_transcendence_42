import Matter, {Bounds, Engine} from 'matter-js';
import {useEffect} from 'react';
import {Socket} from 'socket.io-client';

let PLAYGROUND_SIZE = computePlayground();
const PADDLE_BORDER_SPACING = 40;
const PADDLE_SIZE = {x: 0.025 * PLAYGROUND_SIZE.x, y: 0.2 * PLAYGROUND_SIZE.y};
const PADDLE_SPEED = 25;

function computePlayground() {
	const ratio = Math.abs(window.innerWidth / window.innerHeight);
	const windowHeight = window.innerHeight - 80;
	const windowWidth = window.innerWidth;

	// if (windowWidth > windowHeight) {
	// 	return {x: windowHeight * ratio, y: windowHeight};
	// } else {
	// 	return {x: windowWidth, y: windowWidth * ratio};
	// }
	return {x: windowWidth, y: windowHeight};
}

export class Pong {
	Engine = Matter.Engine;
	Render = Matter.Render;
	Runner = Matter.Runner;
	Body = Matter.Body;
	Bodies = Matter.Bodies;
	Composite = Matter.Composite;

	render: Matter.Render;
	runner: Matter.Runner;
	floor: Matter.Body;
	ceilling: Matter.Body;
	ball: Matter.Body;
	engine: Matter.Engine;
	canvas: HTMLCanvasElement;
	keySet: Set<String>;
	keyHandlers: Map<String, Function>;
	socket: Socket;
	playerPaddle: 'left' | 'right';
	paddles: {[position: string]: Matter.Body};

	constructor(
		canvas: HTMLCanvasElement,
		socket: Socket,
		paddle: 'left' | 'right'
	) {
		// let navBarHeight = document.getElementById('navbar')!.clientHeight;
		this.paddles = {};
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.playerPaddle = paddle;
		this.canvas = canvas;
		this.socket = socket;
		this.engine = this.Engine.create({gravity: {scale: 0}});
		this.render = this.Render.create({
			canvas: this.canvas,
			options: {
				width: PLAYGROUND_SIZE.x,
				height: PLAYGROUND_SIZE.y,
			},
			engine: this.engine,
		});
		PLAYGROUND_SIZE = {x: this.canvas.width, y: this.canvas.height};
		const LEFT_PADDLE_POS = {
			x: PADDLE_BORDER_SPACING,
			y: this.canvas.height / 2,
		};
		const RIGHT_PADDLE_POS = {
			x: PLAYGROUND_SIZE.x - PADDLE_BORDER_SPACING,
			y: this.canvas.height / 2,
		};

		this.paddles['left'] = this.Bodies.rectangle(
			LEFT_PADDLE_POS.x,
			LEFT_PADDLE_POS.y,
			PADDLE_SIZE.x,
			PADDLE_SIZE.y,
			{
				isStatic: true,
			}
		);
		this.paddles['right'] = this.Bodies.rectangle(
			RIGHT_PADDLE_POS.x,
			RIGHT_PADDLE_POS.y,
			PADDLE_SIZE.x,
			PADDLE_SIZE.y,
			{
				velocity: Matter.Vector.create(0, 0),

				// isStatic: true,
			}
		);
		this.floor = this.Bodies.rectangle(
			PLAYGROUND_SIZE.x / 2,
			PLAYGROUND_SIZE.y + 11,
			PLAYGROUND_SIZE.x,
			20,
			{
				isStatic: true,
			}
		);
		this.ceilling = this.Bodies.rectangle(
			PLAYGROUND_SIZE.x / 2,
			0 - 10,
			PLAYGROUND_SIZE.x,
			20,
			{
				isStatic: true,
			}
		);
		this.ball = this.Bodies.circle(200, 0, 20, {isStatic: true});
		this.Composite.add(this.engine.world, [
			this.paddles['left'],
			this.paddles['right'],
			this.floor,
			this.ceilling,
			this.ball,
		]);
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
				this.Body.setPosition(this.paddles[this.playerPaddle], {
					x: this.paddles[this.playerPaddle].position.x,
					y: this.paddles[this.playerPaddle].position.y - PADDLE_SPEED,
				});
				break;
			case 'DOWN':
				this.Body.setPosition(this.paddles[this.playerPaddle], {
					x: this.paddles[this.playerPaddle].position.x,
					y: this.paddles[this.playerPaddle].position.y + PADDLE_SPEED,
				});
				break;
		}
		this.socket.emit('position', this.leftPaddlePosition());
	}

	paddleController() {
		this.canvas.addEventListener('keydown', (event) => {
			this.keySet.add(event.code);
		});
		this.canvas.addEventListener('keyup', (event) => {
			this.keySet.delete(event.code);
		});
		Matter.Events.on(this.engine, 'beforeUpdate', (event) => {
			[...this.keySet].forEach((key) => {
				this.keyHandlers.get(key)?.();
			});
		});
	}

	leftPaddlePosition() {
		return {
			x: this.paddles['left'].position.x,
			y: this.paddles['left'].position.y,
		};
	}

	movePaddle(pos: any) {
		this.Body.setPosition(this.paddles['left'], {x: pos.x, y: pos.y});
	}

	run(): void {
		this.Render.run(this.render);
		this.Runner.run(this.runner, this.engine);
		// Engine.update(this.engine, 1000 / 60);
	}
}
