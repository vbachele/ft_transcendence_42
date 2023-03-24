import Matter = require('matter-js');
import {ServerGameEvents} from './events/game.events';
import * as process from 'process';

const PLAYGROUND_SIZE = {x: 800, y: 600};
const PADDLE_SIZE = {x: 27, y: 140};
const PADDLE_BORDER_SPACING = 40;
let BALL_SPEED = {x: 150, y: 150};
const BALL_SIZE = 40;
const BALL_STARTING_POSITION = {
	x: PLAYGROUND_SIZE.x / 2,
	y: PLAYGROUND_SIZE.y / 2,
};
const FRAME_RATE = 1000 / 60;
const PADDLE_SPEED = 10;
const BALL_ACCELERATION = 1.03;

export class Pong {
	public ball = {
		position: BALL_STARTING_POSITION,
		velocity: {x: 0, y: 0},
		radius: BALL_SIZE / 2,
	};
	public paddles = {
		['left']: {
			position: {x: PADDLE_BORDER_SPACING, y: PLAYGROUND_SIZE.y / 2},
			size: PADDLE_SIZE,
		},
		['right']: {
			position: {
				x: PLAYGROUND_SIZE.x - PADDLE_BORDER_SPACING,
				y: PLAYGROUND_SIZE.y / 2,
			},
			size: PADDLE_SIZE,
		},
	};
	private readonly dispatchToLobby: (event: string, data: any) => void;
	private score = [0, 0];
	private previousTick = Date.now();
	private actualTicks = 0;
	private pause = false;
	private gameLoop: NodeJS.Timeout;

	constructor(dispatchToLobby: (event: string, data: any) => void) {
		this.dispatchToLobby = dispatchToLobby;
	}

	private kickoff() {
		console.log(`kickoff`);
	}

	private detectPaddleCollision() {
		const ball = this.ball;
		const paddles = this.paddles;
		if (
			ball.position.x - ball.radius <=
				paddles.left.position.x + PADDLE_SIZE.x / 2 &&
			ball.position.y >= paddles.left.position.y - PADDLE_SIZE.y / 2 &&
			ball.position.y <= paddles.left.position.y + PADDLE_SIZE.y / 2
		) {
			BALL_SPEED.x = -BALL_SPEED.x * BALL_ACCELERATION;
			ball.velocity.x = -ball.velocity.x;
		}
		if (
			ball.position.x + ball.radius >=
				paddles.right.position.x - PADDLE_SIZE.x / 2 &&
			ball.position.y >= paddles.right.position.y - PADDLE_SIZE.y / 2 &&
			ball.position.y <= paddles.right.position.y + PADDLE_SIZE.y / 2
		) {
			BALL_SPEED.x = -BALL_SPEED.x * BALL_ACCELERATION;
			ball.velocity.x = -ball.velocity.x;
		}
	}

	private detectWallCollision() {
		if (this.ball.position.x - this.ball.radius <= 0) {
			this.playerScored('left');
		}
		if (this.ball.position.x + this.ball.radius >= PLAYGROUND_SIZE.x) {
			this.playerScored('right');
		}
		if (this.ball.position.y - this.ball.radius <= 0) {
			BALL_SPEED.y = -BALL_SPEED.y;
			this.ball.velocity.y = -this.ball.velocity.y;
		}
		if (this.ball.position.y + this.ball.radius >= PLAYGROUND_SIZE.y) {
			BALL_SPEED.y = -BALL_SPEED.y;
			this.ball.velocity.y = -this.ball.velocity.y;
		}
	}

	private playerScored(player: 'left' | 'right') {
		// this.pause = true;
		clearTimeout(this.gameLoop);
		this.score[player === 'left' ? 0 : 1]++;
		this.ball.position = {x: 400, y: 300};
		// this.dispatchToLobby(ServerGameEvents.PlayerScored, this.score);
		console.log(`BALL STARTING POSITION: `, BALL_STARTING_POSITION)
		this.dispatchToLobby(ServerGameEvents.MoveBall, {
			position: {x: 400, y: 300},
			velocity: {x: 0, y: 0},
			message: "stop",
		});
		console.log(`Player ${player} scored! Score: ${this.score}`)
		// this.pause = false;
		this.loop();
	}

	public movePaddle(paddle: 'left' | 'right', direction: 'up' | 'down') {
		switch (direction) {
			case 'up':
				if (
					this.paddles[paddle].position.y - PADDLE_SIZE.y / 2 - PADDLE_SPEED <
					0
				)
					return;
				this.paddles[paddle].position.y -= PADDLE_SPEED;
				break;
			case 'down':
				if (
					this.paddles[paddle].position.y + PADDLE_SIZE.y / 2 + PADDLE_SPEED >
					PLAYGROUND_SIZE.y
				)
					return;
				this.paddles[paddle].position.y += PADDLE_SPEED;
				break;
		}
	}

	private update(progress: number) {
		this.detectWallCollision();
		this.detectPaddleCollision();
		this.ball.position.x += BALL_SPEED.x * progress;
		this.ball.position.y += BALL_SPEED.y * progress;
		this.ball.velocity.x = this.ball.velocity.x + BALL_SPEED.x * progress;
		this.ball.velocity.y = this.ball.velocity.y + BALL_SPEED.y * progress;
		this.dispatchToLobby(ServerGameEvents.MoveBall, {
			position: this.ball.position,
			velocity: this.ball.velocity,
		});
	}

	private loop() {
		// console.log(`tick`);
		const now = Date.now();
		this.actualTicks++;
		if (this.previousTick + FRAME_RATE <= now) {
			const progress = (now - this.previousTick) / 1000;
			this.previousTick = now;
			this.update(progress);
			this.actualTicks = 0;
		}
		if (this.pause) return;
		// const looper = this.loop.bind(this);
		// if (Date.now() - this.previousTick < FRAME_RATE - 16) {
		this.gameLoop = setTimeout(() => {
			this.loop();
		}, FRAME_RATE);
		// } else {
		// 	setImmediate(looper);
		// }
	}

	public start() {
		this.previousTick = Date.now();
		this.loop();
	}
}
