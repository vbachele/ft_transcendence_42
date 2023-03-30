import {Socket} from 'socket.io-client';
import {ClientGameEvents} from '../../events/game.events';
import React, {useRef} from 'react';
import Paddle from './assets/stick.png';

const PLAYGROUND_SIZE = {x: 1280, y: 720};
const BALL_SIZE = 40;
const PADDLE_SIZE = {x: 27, y: 140};
const PADDLE_BORDER_SPACING = 40;
const LEFT_PADDLE_POSITION = {
	x: PADDLE_BORDER_SPACING,
	y: PLAYGROUND_SIZE.y / 2 - PADDLE_SIZE.y / 2,
};
const RIGHT_PADDLE_POSITION = {
	x: PLAYGROUND_SIZE.x - PADDLE_SIZE.x - PADDLE_BORDER_SPACING,
	y: PLAYGROUND_SIZE.y / 2 - PADDLE_SIZE.y / 2,
};

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

class Particle {
	private readonly position: {x: number; y: number};
	private readonly style: string;
	public size: number;
	private angle: number;
	constructor(
		position: {x: number; y: number},
		dispersion: {x: number; y: number},
		private readonly sizeRange: {min: number; max: number},
		private readonly canvas: HTMLCanvasElement,

		private readonly velocity?: {x: number; y: number},
		private readonly speed?: number
	) {
		this.angle = Math.atan2(this.velocity?.x!, this.velocity?.y!);
		this.size = getRandomInt(sizeRange.min, sizeRange.max);
		this.style = `rgba(240, 240, 240, 0.2`;
		this.position = {
			x: position.x + getRandomInt(-dispersion.x, dispersion.x),
			y: position.y + getRandomInt(-dispersion.y, dispersion.y),
		};
	}

	public draw() {
		if (this.canvas.getContext('2d')) {
			const ctx = this.canvas.getContext('2d')!;
			const {x, y} = {x: 2, y: this.size};
			ctx.save();
			ctx.fill();
			ctx.closePath();
			ctx.translate(this.position.x, this.position.y);
			ctx.rotate(-this.angle);
			ctx.fillStyle = this.style;
			ctx.fillRect(-x / 2, -y / 2, x, y);
			ctx.restore();
		}
	}

	public update() {
		if (this.size > 0) {
			let s = this.size - (this.speed ? this.speed : 0.3);
			this.size = s <= 0 ? 0 : s;
		}
	}
}

export class Pong {
	private canvas = document.getElementById('playground')! as HTMLCanvasElement;
	private keySet = new Set<string>();
	private keyHandlers = new Map<string, Function>();
	private readonly socket: Socket;
	private readonly lobbyId: string;
	private readonly playground = document.getElementById('container')!;
	private ball = {
		position: {x: 0, y: 0},
		size: BALL_SIZE,
		velocity: {x: 0, y: 0},
	};
	private leftPaddle = {position: {x: 0, y: 0}, size: PADDLE_SIZE};
	private rightPaddle = {position: {x: 0, y: 0}, size: PADDLE_SIZE};
	private scale = {x: 1, y: 1};
	private animationFrame: number = 0;
	private then = 0;
	private paddle = new Image();
	private particles = [] as Particle[];
	private score = [0, 0];
	private timer = 0;
	private paddleHit = '';

	constructor(
		socket: Socket,
		lobbyId: string,
		spec: {isSpec: boolean},
		timer?: number
	) {
		this.socket = socket;
		this.lobbyId = lobbyId;
		this.timer = timer || 0;
		this.updateScale();
		this.scalePlayground();
		if (this.paddle) {
			this.paddle.src = Paddle;
		}
		if (spec.isSpec) return;
		this.initPaddleController();
		this.paddleController();
	}

	private updateScale() {
		this.scale = {
			x: this.playground.clientWidth / PLAYGROUND_SIZE.x,
			y: this.playground.clientHeight / PLAYGROUND_SIZE.y,
		};
	}

	private scalePlayground() {
		this.canvas.width = PLAYGROUND_SIZE.x * this.scale.x;
		this.canvas.height = PLAYGROUND_SIZE.y * this.scale.y;
		this.ball.size = BALL_SIZE * this.scale.x;
		this.leftPaddle.size = {
			x: PADDLE_SIZE.x * this.scale.x,
			y: PADDLE_SIZE.y * this.scale.y,
		};
		this.leftPaddle.position = {
			x: LEFT_PADDLE_POSITION.x * this.scale.x,
			y: LEFT_PADDLE_POSITION.y * this.scale.y,
		};
		this.rightPaddle.size = {
			x: PADDLE_SIZE.x * this.scale.x,
			y: PADDLE_SIZE.y * this.scale.y,
		};
		this.rightPaddle.position = {
			x: RIGHT_PADDLE_POSITION.x * this.scale.x,
			y: RIGHT_PADDLE_POSITION.y * this.scale.y,
		};
		this.drawPaddles();
		this.drawBall();
	}

	private drawParticles() {
		if (
			this.particles.length < 10 &&
			(this.ball.velocity.x !== 0 || this.ball.velocity.y !== 0)
		) {
			for (let i = 0; i < 2; i++) {
				const length = ((200 * Math.abs(this.ball.velocity.x)) / 6000) * 4.5;
				this.particles.push(
					new Particle(
						{
							x: this.ball.position.x - this.ball.velocity.x * 0.07,
							y: this.ball.position.y - this.ball.velocity.y * 0.07,
						},
						{x: this.ball.size / 2, y: this.ball.size / 2},
						{min: 0, max: length},
						this.canvas,
						this.ball.velocity,
						0.3
					)
				);
			}
		}
		this.particles.forEach((p) => {
			p.draw();
			p.update();
		});
		if (this.particles.length >= 10) {
			this.particles.shift();
			this.particles.shift();
		}
	}

	private drawBall() {
		if (this.canvas.getContext('2d')) {
			const ctx = this.canvas.getContext('2d')!;
			ctx.fillStyle = 'white';
			ctx.beginPath();
			ctx.arc(
				this.ball.position.x,
				this.ball.position.y,
				this.ball.size / 2,
				0,
				2 * Math.PI,
				true
			);
			ctx.fill();
			ctx.stroke();
		}
	}

	private drawPaddles() {
		if (this.canvas.getContext('2d')) {
			const ctx = this.canvas.getContext('2d')!;
			ctx.save();
			ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
			ctx.shadowBlur = 5;
			ctx.shadowOffsetY = 10;
			ctx.shadowOffsetX = -10;
			ctx.drawImage(
				this.paddle,
				this.leftPaddle.position.x,
				this.leftPaddle.position.y,
				this.leftPaddle.size.x,
				this.leftPaddle.size.y
			);
			ctx.shadowOffsetY = 10;
			ctx.shadowOffsetX = 10;
			ctx.drawImage(
				this.paddle,
				this.rightPaddle.position.x,
				this.rightPaddle.position.y,
				this.rightPaddle.size.x,
				this.rightPaddle.size.y
			);
			ctx.restore();
		}
	}

	private drawPaddleHit(
		position: {x: number; y: number},
		canvas: HTMLCanvasElement
	) {
		const particles = [] as Particle[];
		for (let i = 0; i < 20; i++) {
			particles.push(
				new Particle(
					position,
					{x: 0, y: 0},
					{min: 1, max: 6},
					canvas,
					{x: 0, y: 0},
					1
				)
			);
		}
		for (let i = 0; i < particles.length; i++) {
			particles[i].draw();
			particles[i].update();
		}
	}

	private drawTimer() {
		if (!this.timer) return;
		const ctx = this.canvas.getContext('2d')!;
		if (!ctx) return;
		const date = new Date(this.timer);
		const minutes = date.getUTCMinutes();
		const seconds = date.getUTCSeconds();
		ctx.save();
		ctx.shadowColor = 'rgba(230, 230, 230, 0.6)';
		ctx.shadowBlur = 4;
		ctx.shadowOffsetY = 3;
		ctx.shadowOffsetX = 3;
		ctx.font = '40px Montserrat';
		ctx.textAlign = 'center';
		ctx.fillText(
			`${minutes > 9 ? '' : '0'}${minutes}:${seconds > 9 ? '' : '0'}${seconds}`,
			this.canvas.width / 2,
			200
		);
		ctx.restore();
	}

	private clearCanvas() {
		if (this.canvas.getContext('2d')) {
			const ctx = this.canvas.getContext('2d')!;
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	private initPaddleController() {
		this.keyHandlers.set('ArrowUp', () => {
			this.move.bind(this)('UP');
		});
		this.keyHandlers.set('ArrowDown', () => {
			this.move.bind(this)('DOWN');
		});
	}

	private move(direction: string): void {
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

	private gameLoop() {
		const now = Date.now();
		const elapsed = now - this.then;
		if (elapsed > 1000 / 60) {
			this.keyHandlers.forEach((handler, key) => {
				if (this.keySet.has(key)) {
					handler();
				}
			});
			this.then = Date.now();
		}
		this.clearCanvas();
		this.drawTimer();
		this.drawBall();
		this.drawPaddles();
		if (
			!(
				this.ball.position.x >= this.canvas.width / 2 - 5 &&
				this.ball.position.x <= this.canvas.width / 2 + 5 &&
				this.ball.position.y >= this.canvas.height / 2 - 5 &&
				this.ball.position.y <= this.canvas.height / 2 + 5
			)
		) {
			this.drawParticles();
		} else {
			this.particles = [];
		}
		// if (this.paddleHit) {
		// 	this.drawPaddleHit(
		// 		this.paddleHit === 'left'
		// 			? {
		// 					x: this.leftPaddle.position.x,
		// 					y: this.leftPaddle.position.y + this.leftPaddle.size.y / 2,
		// 			  }
		// 			: {
		// 					x: this.rightPaddle.position.x,
		// 					y: this.rightPaddle.position.y + this.rightPaddle.size.y / 2,
		// 			  },
		// 		this.canvas
		// 	);
		// 	// this.paddleHit = '';
		// }
		this.animationFrame = requestAnimationFrame(() => this.gameLoop());
	}

	private paddleController() {
		window.addEventListener('keydown', (event) => {
			this.keySet.add(event.code);
		});
		window.addEventListener('keyup', (event) => {
			this.keySet.delete(event.code);
		});
	}

	public movePaddle(side: 'left' | 'right', position: {x: number; y: number}) {
		switch (side) {
			case 'left':
				this.leftPaddle.position = {
					x: position.x * this.scale.x,
					y: position.y * this.scale.y,
				};
				break;
			case 'right':
				this.rightPaddle.position = {
					x: position.x * this.scale.x,
					y: position.y * this.scale.y,
				};
				break;
			default:
				return;
		}
	}

	public moveBall(
		position: {x: number; y: number},
		velocity: {x: number; y: number}
	) {
		this.ball.position = {
			x: position.x * this.scale.x,
			y: position.y * this.scale.y,
		};
		this.ball.velocity = velocity;
	}


	public updateTimer(timer: number) {
		this.timer = timer;
	}

	public updatePaddleHit(side: 'left' | 'right') {
		this.paddleHit = side;
	}

	public start() {
		window.addEventListener('resize', () => {
			this.updateScale();
			this.scalePlayground();
		});
		this.then = Date.now();
		this.animationFrame = requestAnimationFrame(() => this.gameLoop());
	}

	public stop() {
		cancelAnimationFrame(this.animationFrame);
		this.keyHandlers.clear();
		this.keySet.clear();
	}
}
