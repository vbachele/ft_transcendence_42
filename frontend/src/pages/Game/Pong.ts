import Matter, {Bounds, Engine} from 'matter-js';
import {useEffect} from 'react';
import {Socket} from 'socket.io-client';
import {ClientGameEvents} from '../../events/game.events';

export interface BodyData {
	id: string;
	type: string;
	position: {x: number; y: number};
	velocity: {x: number; y: number};
	render: any;
	vertices: any;
}

// let PLAYGROUND_SIZE = computePlayground();
// const PADDLE_BORDER_SPACING = 40;
// const PADDLE_SIZE = {x: 0.025 * PLAYGROUND_SIZE.x, y: 0.2 * PLAYGROUND_SIZE.y};
// const PADDLE_SPEED = 25;

// height / ratio
// function computePlayground() {
// 	const screenRatio = Math.abs(window.screen.width / window.screen.height);
// 	console.log(`Screen ratio = `, screenRatio);
//
// 	let scaledHeight = window.innerWidth / screenRatio;
// 	let scaledWidth = scaledHeight * screenRatio;
// 	console.log(`scaled height = `, scaledHeight);
// 	if (scaledHeight > window.innerHeight) {
// 		scaledHeight = window.innerHeight;
// 		scaledWidth = scaledHeight * screenRatio;
// 	}
// 	console.log(`FINAL scale = `, scaledWidth / scaledHeight);
// 	return {x: scaledWidth, y: scaledHeight};
// }

const PLAYGROUND_SIZE = {x: 800, y: 600};

const Render = Matter.Render,
	World = Matter.World,
	Runner = Matter.Runner,
	Body = Matter.Body,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;

export class Pong {
	render: Matter.Render;
	engine: Matter.Engine;
	socket: Socket;
	lobbyId: string;
	canvas: HTMLCanvasElement;
	private keySet = new Set<string>();
	private keyHandlers = new Map<string, Function>();

	constructor(canvas: HTMLCanvasElement, socket: Socket, data: any, lobbyId: string) {
		this.socket = socket;
		this.lobbyId = lobbyId;
		this.canvas = canvas;
		this.initPaddleController();
		this.engine = Engine.create({gravity: {scale: 0}});
		this.render = Render.create({
			canvas: canvas,
			options: {
				width: PLAYGROUND_SIZE.x,
				height: PLAYGROUND_SIZE.y,
			},
			engine: this.engine,
		});
		data.forEach((body: string) => {
			Composite.add(this.engine.world, Body.create(JSON.parse(body)));
		});
		Render.run(this.render);
	}

	updateBody(bodyData: any) {
		const body = Matter.Composite.get(
			this.engine.world,
			bodyData.id,
			bodyData.type
		) as Matter.Body;
		Body.setPosition(body, bodyData.position);
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
		console.log(`moving`);
		switch (direction) {
			case 'UP':
				this.socket.emit(ClientGameEvents.MovePaddle, {
					lobbyId: this.lobbyId,
					direction: 'up',
				});
				break;
			case 'DOWN':
				this.socket.emit(ClientGameEvents.MovePaddle, {
					lobbyId: this.lobbyId,
					direction: 'down',
				});
		}
	}

	paddleController() {
		this.canvas.addEventListener('keydown', (event) => {
			this.keySet.add(event.code);
		});
		this.canvas.addEventListener('keyup', (event) => {
			this.keySet.delete(event.code);
		});
		Matter.Events.on(this.render, 'beforeRender', (event) => {
			[...this.keySet].forEach((key) => {
				this.keyHandlers.get(key)?.();
			});
		});
	}
}

// render: Matter.Render;
// runner: Matter.Runner;
// floor: Matter.Body;
// ceilling: Matter.Body;
// ball: Matter.Body;
// engine: Matter.Engine;
// canvas: HTMLCanvasElement;
// keySet: Set<String>;
// keyHandlers: Map<String, Function>;
// socket: Socket;
// playerPaddle: 'left' | 'right';
// opponentPaddle: 'left' | 'right';
// paddles: {[position: string]: Matter.Body};
// lobbyId: string;
//
// constructor(
// 	canvas: HTMLCanvasElement,
// 	socket: Socket,
// 	paddle: 'left' | 'right',
// 	lobbyId: string
// ) {
// 	// let navBarHeight = document.getElementById('navbar')!.clientHeight
// 	console.log(`playground size = `, PLAYGROUND_SIZE);
// 	this.paddles = {};
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	this.playerPaddle = paddle;
// 	this.lobbyId = lobbyId;
// 	paddle === 'right'
// 		? (this.opponentPaddle = 'left')
// 		: (this.opponentPaddle = 'right');
// 	this.canvas = canvas;
// 	this.socket = socket;
// 	this.engine = this.Engine.create({gravity: {scale: 0}});
// 	this.render = this.Render.create({
// 		canvas: this.canvas,
// 		options: {
// 			width: PLAYGROUND_SIZE.x,
// 			height: PLAYGROUND_SIZE.y,
// 		},
// 		engine: this.engine,
// 	});
// 	PLAYGROUND_SIZE = {x: this.canvas.width, y: this.canvas.height};
// 	const LEFT_PADDLE_POS = {
// 		x: PADDLE_BORDER_SPACING,
// 		y: this.canvas.height / 2,
// 	};
// 	const RIGHT_PADDLE_POS = {
// 		x: PLAYGROUND_SIZE.x - PADDLE_BORDER_SPACING,
// 		y: this.canvas.height / 2,
// 	};
//
// 	this.paddles['left'] = this.Bodies.rectangle(
// 		LEFT_PADDLE_POS.x,
// 		LEFT_PADDLE_POS.y,
// 		PADDLE_SIZE.x,
// 		PADDLE_SIZE.y,
// 		{
// 			isStatic: true,
// 		}
// 	);
// 	this.paddles['right'] = this.Bodies.rectangle(
// 		RIGHT_PADDLE_POS.x,
// 		RIGHT_PADDLE_POS.y,
// 		PADDLE_SIZE.x,
// 		PADDLE_SIZE.y,
// 		{
// 			velocity: Matter.Vector.create(0, 0),
//
// 			// isStatic: true,
// 		}
// 	);
// 	this.floor = this.Bodies.rectangle(
// 		PLAYGROUND_SIZE.x / 2,
// 		PLAYGROUND_SIZE.y + 11,
// 		PLAYGROUND_SIZE.x,
// 		20,
// 		{
// 			isStatic: true,
// 		}
// 	);
// 	this.ceilling = this.Bodies.rectangle(
// 		PLAYGROUND_SIZE.x / 2,
// 		0 - 10,
// 		PLAYGROUND_SIZE.x,
// 		20,
// 		{
// 			isStatic: true,
// 		}
// 	);
// 	this.ball = this.Bodies.circle(200, 0, 20, {isStatic: true});
// 	this.Composite.add(this.engine.world, [
// 		this.paddles['left'],
// 		this.paddles['right'],
// 		this.floor,
// 		this.ceilling,
// 		this.ball,
// 	]);
// 	this.runner = this.Runner.create();
// 	this.keySet = new Set<String>();
// 	this.keyHandlers = new Map<string, Function>();
// 	this.initPaddleController();
// }
//
// initPaddleController() {
// 	this.keyHandlers.set('ArrowUp', () => {
// 		this.move('UP');
// 	});
// 	this.keyHandlers.set('ArrowDown', () => {
// 		this.move('DOWN');
// 	});
// }
//
// move(direction: string): void {
// 	switch (direction) {
// 		case 'UP':
// 			this.Body.setPosition(this.paddles[this.playerPaddle], {
// 				x: this.paddles[this.playerPaddle].position.x,
// 				y: this.paddles[this.playerPaddle].position.y - PADDLE_SPEED,
// 			});
// 			break;
// 		case 'DOWN':
// 			this.Body.setPosition(this.paddles[this.playerPaddle], {
// 				x: this.paddles[this.playerPaddle].position.x,
// 				y: this.paddles[this.playerPaddle].position.y + PADDLE_SPEED,
// 			});
// 			break;
// 	}
// 	this.socket.emit(ClientGameEvents.MovePaddle, {
// 		lobbyId: this.lobbyId,
// 		...this.paddles[this.playerPaddle].position,
// 	});
// }
//
// paddleController() {
// 	this.canvas.addEventListener('keydown', (event) => {
// 		this.keySet.add(event.code);
// 	});
// 	this.canvas.addEventListener('keyup', (event) => {
// 		this.keySet.delete(event.code);
// 	});
// 	Matter.Events.on(this.engine, 'beforeUpdate', (event) => {
// 		[...this.keySet].forEach((key) => {
// 			this.keyHandlers.get(key)?.();
// 		});
// 	});
// }
//
// updatePaddle(pos: {x: number; y: number}) {
// 	this.Body.setPosition(this.paddles[this.opponentPaddle], {
// 		x: pos.x,
// 		y: pos.y,
// 	});
// }
//
// run(): void {
// 	this.Render.run(this.render);
// 	this.Runner.run(this.runner, this.engine);
// 	// Engine.update(this.engine, 1000 / 60);
// }
