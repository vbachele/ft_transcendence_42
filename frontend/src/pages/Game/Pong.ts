import Matter, {Bounds, Engine} from 'matter-js';
import {useContext, useEffect} from 'react';
import {Socket} from 'socket.io-client';
import {ClientGameEvents} from '../../events/game.events';
import SocketContext from '../../contexts/Socket/context';
import {useSearchParams} from 'react-router-dom';

const PLAYGROUND_SIZE = {x: 800, y: 600};

export class Pong {
	private keySet = new Set<string>();
	private keyHandlers = new Map<string, Function>();
	private readonly canvas = document.getElementById(
		'canvas'
	) as HTMLCanvasElement;
	private readonly socket: Socket;
	private readonly lobbyId: string;

	constructor(socket: Socket, lobbyId: string) {
		this.socket = socket;
		this.lobbyId = lobbyId;
		this.initPaddleController();
		this.paddleController();
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
				this.socket?.emit(ClientGameEvents.MovePaddle, {
					lobbyId: this.lobbyId,
					direction: 'up',
				});
				break;
			case 'DOWN':
				this.socket?.emit(ClientGameEvents.MovePaddle, {
					lobbyId: this.lobbyId,
					direction: 'down',
				});
		}
	}

	private loop() {
			this.keyHandlers.forEach((handler, key) => {
				if (this.keySet.has(key)) {
					handler();
				}
			});
		requestAnimationFrame(() => this.loop());
	}

	paddleController() {
		window.addEventListener('keydown', (event) => {
			this.keySet.add(event.code);
		});
		window.addEventListener('keyup', (event) => {
			this.keySet.delete(event.code);
		});
	}

	public movePaddle(paddle: HTMLElement, position: {x: number; y: number}) {
		paddle.style.transform = `translate(${
			position.x - paddle.clientWidth! / 2
		}px, ${position.y - paddle.clientHeight! / 2}px)`;
	}

	public moveBall(
		ball: HTMLElement,
		position: {x: number; y: number},
		velocity: {x: number; y: number}
	) {
		const angle = Math.atan2(velocity.x, velocity.y);
		ball.style.transform = `translate(${position.x}px, ${
			position.y
		}px) rotate(${-angle}rad)`;
	}

	public start() {
		requestAnimationFrame(() => this.loop());
	}
}
