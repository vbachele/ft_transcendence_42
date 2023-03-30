import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';

import {Server} from 'socket.io';
import {AuthenticatedSocket} from 'src/lobby/types/lobby.type';
import {WebsocketService} from './websocket.service';

@WebSocketGateway()
export class WebsocketGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	@WebSocketServer() server: Server;

	constructor(private websocketService: WebsocketService) {}

	afterInit(server: Server) {
		this.websocketService.server = this.server;
	}

	async handleConnection(
		@ConnectedSocket() client: AuthenticatedSocket,
		...args: any[]
	) {
		client.data.name = client.handshake.query.name as string;
		console.info(`Connected - Client Name [${client.data.name}]`);
	}

	async handleDisconnect(@ConnectedSocket() client: AuthenticatedSocket) {
		console.info(`Disconnected - Client ID [${client.data.name}]`);

		this.websocketService.removeUser(client);
		const users = Object.keys(this.websocketService.clients);
		this.websocketService.sendMessage(client, 'user_disconnected', users);
		await this.websocketService.updateStatus(client, 'offline');
	}

	@SubscribeMessage('handshake')
	async handleHandshake(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody() data: string
	) {
		console.info(`Handshake received from [${client.data.name}]`);

		const reconnected = this.websocketService.getClient(client.data.name);

		if (reconnected) {
			console.info(`User [${client.data.name}] has reconnected`);
			return;
		}

		this.websocketService.addUser(client);
		const users = Object.keys(this.websocketService.clients);

		console.info('Sending callback for handshake...');
		this.server.to(client.id).emit('handshake', client.data.name, users);
		this.websocketService.sendMessage(client, 'user_connected', users);
		await this.websocketService.updateStatus(client, 'online');
	}
}
