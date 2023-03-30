import {ALobby} from '../lobby/ALobby';
import {Injectable} from '@nestjs/common';
import {IsString} from 'class-validator';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {WebsocketService} from '../websocket/websocket.service';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {ServerGameEvents} from './events/game.events';
import {Pong} from './pong';
import {GameMode} from './types/game.type';
import {PrismaService} from '../database/prisma.service';
import {GameErrorType, GameException} from './errors/game.error';

export class GameLobbyDto {
	@IsString()
	mode: GameMode;
}

type PlayerState = 'ready' | 'notReady';

@Injectable()
export class GameLobby extends ALobby {
	instance?: Pong;
	state: 'waiting' | 'running' | 'paused' | 'ready';
	mode: GameMode;
	playerStates: Map<string, PlayerState> = new Map();

	constructor(
		data: GameLobbyDto,
		private readonly websocketService: WebsocketService,
		private readonly prismaService: PrismaService,
	) {
		super(websocketService.server, 2);
		this.mode = data.mode;
		this.instance = new Pong(this.dispatchToLobby.bind(this), this.mode, prismaService, websocketService);
		this.state = 'waiting';
	}

	stopGame() {
		this.instance?.stop();
		this.state = 'paused';
	}

	runGame() {
		this.instance?.start();
		this.state = 'running';
	}

	movePaddle(
		@ConnectedSocket()
		client: AuthenticatedSocket,
		direction: 'up' | 'down'
	) {
		if (this.state !== 'running') return;
		this.validateClient(client);
		this.instance?.movePaddle(client.data.paddle, direction);
		const paddle =
			this.instance?.paddles[client.data.paddle as 'left' | 'right'];
		this.dispatchToLobby(ServerGameEvents.MovePaddle, {
			paddle: client.data.paddle,
			position: paddle!.position,
		});
	}

	gameSetup() {
		const leftPlayer = [...this.clients.values()][0];
		const rightPlayer = [...this.clients.values()][1];
		if (!leftPlayer || !rightPlayer) throw new WsException('Not enough players');
		this.instance?.setPlayer(leftPlayer, 'left');
		this.instance?.setPlayer(rightPlayer, 'right');
		return {
			ball: {
				position: this.instance?.ball.position,
				velocity: {x: 0, y: 0},
				size: this.instance?.ball.radius! * 2,
			},
			leftPaddle: this.instance?.paddles['left'],
			rightPaddle: this.instance?.paddles['right'],
			timer:
				this.mode === GameMode.AgainstTheClock ? this.instance?.timeLimit : '',
		};
	}

	validateClient(
		@ConnectedSocket()
		client: AuthenticatedSocket
	) {
		if (!this.clients.has(client.data.name))
			throw new GameException(GameErrorType.Forbidden);
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
