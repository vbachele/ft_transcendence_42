import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WsResponse,
} from '@nestjs/websockets';

import {PrismaLobbyService} from '../database/lobby/prismaLobby.service';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {ValidationPipe} from '@nestjs/common';

import {WebsocketService} from '../websocket/websocket.service';

@WebSocketGateway()
export class NotificationGateway {
	constructor(
		private readonly prismaLobbyService: PrismaLobbyService,
		private readonly websocketService: WebsocketService
	) {}

	@SubscribeMessage('sendNotification')
	onSendMessage(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('receiverName') receiverName: string
	) {
		// const client = this.websocketService.get;
		console.log(receiverName);

		// this.websocketService.server.to(receiverName);
	}
}
