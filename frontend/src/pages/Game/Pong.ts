import Matter, {Bounds, Engine} from 'matter-js';
import {useEffect} from 'react';
import {Socket} from 'socket.io-client';
import {ClientGameEvents} from '../../events/game.events';

export class Pong {
	socket: Socket;
	lobbyId: string;
	canvas: HTMLCanvasElement;
	private keySet = new Set<string>();
	private keyHandlers = new Map<string, Function>();
	private engine = Matter.Engine.create();
	private readonly render;

	constructor(canvas: HTMLCanvasElement, socket: Socket, data: any, lobbyId: string) {
		this.socket = socket;
		this.lobbyId = lobbyId;
		this.canvas = canvas;
		this.initPaddleController();
		this.render = Matter.Render.create({
			engine: this.engine,
			canvas: this.canvas,
			options: {
				width: 800,
				height: 600,
			}
		});
		Matter.Render.run(this.render);
	}

	// updateBody(bodyData: any) {
	// 	const body = Matter.Composite.get(
	// 		this.engine.world,
	// 		bodyData.id,
	// 		bodyData.type
	// 	) as Matter.Body;
	// 	Body.setPosition(body, bodyData.position);
	// }

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
