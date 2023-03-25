import {ALobby} from '../lobby/ALobby';
import {ForbiddenException, Injectable} from '@nestjs/common';
import {IsString} from 'class-validator';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {WebsocketService} from '../websocket/websocket.service';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {ServerGameEvents} from './events/game.events';
import {Pong} from './pong';
import Matter = require('matter-js');
import {Events} from 'matter-js';
import {serialize} from 'class-transformer';

export class GameLobbyDto {
	@IsString()
	mode: string;
}

type PlayerState = 'ready' | 'notReady';

@Injectable()
export class GameLobby extends ALobby {
	data: GameLobbyDto;
	instance: Pong;
	state: 'waiting' | 'running' | 'paused';
	playerStates: Map<string, PlayerState> = new Map();

	constructor(
		data: GameLobbyDto,
		private readonly websocketService: WebsocketService
	) {
		super(websocketService.server, 2);
		this.data = data;
		this.instance = new Pong(this.dispatchToLobby.bind(this));
		this.state = 'waiting';
	}

	runGame() {
		this.instance.start();
		this.state = 'running';
	}

	movePaddle(
		@ConnectedSocket()
		client: AuthenticatedSocket,
		direction: 'up' | 'down'
	) {
		if (this.state !== 'running') return;
		this.validateClient(client);
		this.instance.movePaddle(client.data.paddle, direction);
		const paddle =
			this.instance.paddles[client.data.paddle as 'left' | 'right'];
		this.dispatchToLobby(ServerGameEvents.MovePaddle, {
			paddle: client.data.paddle,
			position: paddle.position,
		});
	}

	gameSetup() {
		[...this.clients.values()][0].data.paddle = 'left';
		[...this.clients.values()][1].data.paddle = 'right';
		return {
			ball: {
				position: this.instance.ball.position,
				velocity: this.instance.ball.velocity,
				size: this.instance.ball.radius * 2,
			},
			leftPaddle: this.instance.paddles['left'],
			rightPaddle: this.instance.paddles['right'],
		};
	}

	validateClient(
		@ConnectedSocket()
		client: AuthenticatedSocket
	) {
		if (!this.clients.has(client.data.name))
			throw new WsException(
				`Client [${client.data.name}] doesn't belong to the lobby`
			);
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
