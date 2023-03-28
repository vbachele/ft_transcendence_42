import {ServerGameEvents} from './events/game.events';
import {GameMode} from './types/game.type';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {PrismaService} from '../database/prisma.service';

const PLAYGROUND_SIZE = {x: 1280, y: 720};
const PADDLE_SIZE = {x: 27, y: 140};
const PADDLE_BORDER_SPACING = 40;
let BALL_SPEED = {x: 300, y: 300};
const BALL_SIZE = 40;
const BALL_STARTING_POSITION = {
	x: PLAYGROUND_SIZE.x / 2,
	y: PLAYGROUND_SIZE.y / 2,
} as const;
const FRAME_RATE = 1000 / 60;
const PADDLE_SPEED = 15;
const BALL_ACCELERATION = 1.05;

export class Pong {
	public ball = {
		position: {...BALL_STARTING_POSITION},
		velocity: {x: 0, y: 0},
		radius: BALL_SIZE / 2,
	};
	public paddles = {
		['left']: {
			position: {
				x: PADDLE_BORDER_SPACING,
				y: PLAYGROUND_SIZE.y / 2 - PADDLE_SIZE.y / 2,
			},
			size: PADDLE_SIZE,
		},
		['right']: {
			position: {
				x: PLAYGROUND_SIZE.x - PADDLE_SIZE.x - PADDLE_BORDER_SPACING,
				y: PLAYGROUND_SIZE.y / 2 - PADDLE_SIZE.y / 2,
			},
			size: PADDLE_SIZE,
		},
	};
	private score = [0, 0];
	private previousTick = Date.now();
	private pause = false;
	private timeout: NodeJS.Timeout;
	private immediate: NodeJS.Immediate;
	private readonly mode: GameMode;
	private readonly scoreLimit = 5;
	private readonly players: {
		left: AuthenticatedSocket | undefined;
		right: AuthenticatedSocket | undefined;
	} = {['left']: undefined, ['right']: undefined};
	public timeLimit = 1.50 * 60 * 1000;
	private timerRef: NodeJS.Timeout;

	constructor(
		private readonly dispatchToLobby: (event: string, data: any) => void,
		mode: GameMode,
		private readonly prismaService: PrismaService
	) {
		this.mode = mode;
	}

	private timer() {
		this.timerRef = setTimeout(() => {
			this.timeLimit -= 1000;
			this.dispatchToLobby(ServerGameEvents.Timer, {time: this.timeLimit});
			if (this.timeLimit <= 0) {
				this.observeWinner().catch(console.error);
				clearTimeout(this.timerRef);
				return;
			}
			this.timer();
		}, 1_000);
	}

	private async observeWinner() {
		if (this.mode === GameMode.AgainstTheClock && this.timeLimit > 1000) return;
		if (
			this.mode === GameMode.ScoreLimit &&
			this.score[0] < this.scoreLimit &&
			this.score[1] < this.scoreLimit
		)
			return;
		this.stop();
		if (this.score[0] > this.score[1]) {
			this.dispatchToLobby(ServerGameEvents.GameResult, {
				winner: this.players['left']?.data.name,
			});
			await this.prismaService.user.update({
				where: { name: this.players['left']?.data.name },
				data: { wins: { increment: 1 } },
			});
		} else if (this.score[0] < this.score[1]) {
			this.dispatchToLobby(ServerGameEvents.GameResult, {
				winner: this.players['right']?.data.name,
			});
			await this.prismaService.user.update({
				where: { name: this.players['right']?.data.name },
				data: { wins: { increment: 1 } },
			});
		} else {
			this.dispatchToLobby(ServerGameEvents.GameResult, {
				winner: 'draw',
			});
		}
		await this.prismaService.game.create({
			data: {
				createdAt: new Date(),
				finishedAt: new Date(),
				leftPlayerName: this.players['left']?.data.name!,
				rightPlayerName: this.players['right']?.data.name!,
				leftScore: this.score[0],
				rightScore: this.score[1],
			},
		});

		this.updateUser(this.players['left']?.data.name!);
		this.updateUser(this.players['right']?.data.name!);

		this.players['left']!.data.paddle = undefined;
		this.players['right']!.data.paddle = undefined;
		return 'game_over';
	}

	private async updateUser(username: string) {
		console.log('updating user', username);

		const user = await this.prismaService.user.findUnique({
			where: { name: username },
		});

		const games = user.games || 0;
		const wins = user.wins || 0;
		const gamesWon = games > 0 ? wins / games : 0;
		const ratio = gamesWon.toFixed(2);
		const score = Math.round((games * 10 + wins * 40) * (parseFloat(ratio) + 1));

		await this.prismaService.user.update({
			where: { name: username },
			data: {
				score,
				games: { increment: 1 },
				ratio: parseFloat(ratio),
			},
		});
	}

	private async playerScored(player: 'left' | 'right') {
		this.stop();
		this.score[player === 'left' ? 0 : 1]++;
		this.dispatchToLobby(ServerGameEvents.UpdateScore, {score: this.score});
		const gameState = await this.observeWinner();
		if (gameState === 'game_over') return;
		setTimeout(() => {
			this.previousTick = Date.now();
			this.pause = false;
			this.loop();
		}, 800);
	}

	private clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}

	private computeVelocity(velocity: {x: number; y: number}) {
		if (Math.sign(velocity.x) === 1 && Math.sign(velocity.y) === 1) {
			return {x: -velocity.x, y: velocity.y};
		}
		if (Math.sign(velocity.x) === -1 && Math.sign(velocity.y) === 1) {
			return {x: -velocity.x, y: velocity.y};
		}
		if (Math.sign(velocity.x) === 1 && Math.sign(velocity.y) === -1) {
			return {x: velocity.x, y: -velocity.y};
		}
		if (Math.sign(velocity.x) === -1 && Math.sign(velocity.y) === -1) {
			return {x: -velocity.x, y: velocity.y};
		}
		return {x: velocity.x, y: velocity.y};
	}

	private detectPaddleEdgeCollision() {
		const delta = 3;
		const ball = this.ball;
		const paddles = this.paddles;
		if (
			ball.position.x <= paddles.left.position.x &&
			ball.position.y + ball.radius >= paddles.left.position.y &&
			ball.position.y - ball.radius <=
				paddles.left.position.y + PADDLE_SIZE.y + delta
		) {
			ball.position.x = paddles.left.position.x - ball.radius;
			BALL_SPEED = this.computeVelocity(BALL_SPEED);
			return true;
		}
		if (
			ball.position.x >= paddles.right.position.x + PADDLE_SIZE.x &&
			ball.position.y + ball.radius >= paddles.right.position.y - delta &&
			ball.position.y - ball.radius <=
				paddles.right.position.y + PADDLE_SIZE.y + delta
		) {
			ball.position.x = paddles.right.position.x + PADDLE_SIZE.x + ball.radius;
			BALL_SPEED = this.computeVelocity(BALL_SPEED);
			return true;
		}
		return false;
	}
	private detectPaddleCollision() {
		const delta = 3;
		const ball = this.ball;
		const paddles = this.paddles;
		if (this.detectPaddleEdgeCollision()) return;
		if (
			ball.position.x - ball.radius <=
			paddles.left.position.x + PADDLE_SIZE.x &&
			ball.position.x >= paddles.left.position.x + PADDLE_SIZE.x
		) {
			if (
				ball.position.y + ball.radius - delta >= paddles.left.position.y &&
				ball.position.y - ball.radius + delta <=
					paddles.left.position.y + PADDLE_SIZE.y
			) {
				ball.position.x = paddles.left.position.x + PADDLE_SIZE.x + ball.radius;
				BALL_SPEED.x = this.clamp(-BALL_SPEED.x * BALL_ACCELERATION, -800, 800);
			}
		}
		if (ball.position.x + ball.radius >=
			paddles.right.position.x &&
			ball.position.x <= paddles.right.position.x
		) {
			if (
				ball.position.y + ball.radius - delta >=
					paddles.right.position.y + delta &&
				ball.position.y - ball.radius + delta <=
					paddles.right.position.y + PADDLE_SIZE.y - delta
			) {
				ball.position.x = paddles.right.position.x - ball.radius;
				BALL_SPEED.x = this.clamp(-BALL_SPEED.x * BALL_ACCELERATION, -800, 800);
			}
		}
	}

	private detectWallCollision() {
		if (this.ball.position.x - this.ball.radius <= 0) {
			this.playerScored('right');
		}
		if (this.ball.position.x + this.ball.radius >= PLAYGROUND_SIZE.x) {
			this.playerScored('left');
		}
		if (this.ball.position.y - this.ball.radius <= 0) {
			BALL_SPEED.y = -BALL_SPEED.y;
		}
		if (this.ball.position.y + this.ball.radius >= PLAYGROUND_SIZE.y) {
			BALL_SPEED.y = -BALL_SPEED.y;
		}
	}

	/**
	 * @description updateBallPosition() updates the ball position based on the current speed
	 */
	private updateBallPosition({x, y}: {x: number; y: number}) {
		this.ball.position.x += x;
		this.ball.position.y += y;
		this.ball.position.x = this.clamp(
			this.ball.position.x,
			0,
			PLAYGROUND_SIZE.x
		);
		this.ball.position.y = this.clamp(
			this.ball.position.y,
			0,
			PLAYGROUND_SIZE.y
		);
	}

	/**
	 * @description update() is called every FRAME_RATE milliseconds
	 * @param progress is the time passed since the last update in milliseconds
	 */
	private update(progress: number) {
		this.detectWallCollision();
		this.detectPaddleCollision();
		this.updateBallPosition({
			x: BALL_SPEED.x * progress,
			y: BALL_SPEED.y * progress,
		});
		this.dispatchToLobby(ServerGameEvents.MoveBall, {
			position: this.ball.position,
			velocity: BALL_SPEED,
		});
	}

	/**
	 *
	 * @private loop() is called every FRAME_RATE milliseconds
	 */
	private loop() {
		const now = Date.now();
		if (this.previousTick + FRAME_RATE <= now) {
			const progress = (now - this.previousTick) / 1000;
			this.previousTick = now;
			this.update(progress);
		}
		if (this.pause) return;
		if (Date.now() - this.previousTick < FRAME_RATE - 16) {
			this.timeout = setTimeout(() => {
				this.loop();
			}, FRAME_RATE);
		} else {
			this.immediate = setImmediate(() => {
				this.loop();
			});
		}
	}

	public movePaddle(paddleSide: 'left' | 'right', direction: 'up' | 'down') {
		const paddle = this.paddles[paddleSide];
		if (!paddle.position) return;
		switch (direction) {
			case 'up':
				paddle.position.y = this.clamp(
					paddle.position.y - PADDLE_SPEED,
					0,
					PLAYGROUND_SIZE.y
				);
				break;
			case 'down':
				paddle.position.y = this.clamp(
					paddle.position.y + PADDLE_SPEED,
					0,
					PLAYGROUND_SIZE.y - PADDLE_SIZE.y
				);
				break;
		}
	}

	public setPlayer(player: AuthenticatedSocket, side: 'left' | 'right') {
		player.data.paddle = side;
		this.players[side] = player;
	}

	public start() {
		this.previousTick = Date.now();
		if (this.mode === GameMode.AgainstTheClock) this.timer();
		this.loop.bind(this)();
	}

	public stop() {
		this.ball.position = {...BALL_STARTING_POSITION};
		this.dispatchToLobby(ServerGameEvents.MoveBall, {
			position: BALL_STARTING_POSITION,
			velocity: {x: 0, y: 0},
			message: 'stop',
		});
		clearTimeout(this.timeout);
		clearImmediate(this.immediate);
		this.pause = true;
	}
}
