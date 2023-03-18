import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsException,
} from '@nestjs/websockets';

import {Server, Socket} from 'socket.io';
import {PrismaLobbyService} from 'src/database/lobby/prismaLobby.service';
import {AuthenticatedSocket} from 'src/lobby/types/lobby.type';
import {WebsocketService} from './websocket.service';

@WebSocketGateway()
export class WebsocketGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	@WebSocketServer() server: Server;
	public users: Map<string, AuthenticatedSocket> = new Map<
		string,
		AuthenticatedSocket
	>();

	constructor(
		private websocketService: WebsocketService,
		private readonly prismaLobbyService: PrismaLobbyService
	) {}

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

		const name = this.GetNameFromSocketId(client.id);
		if (name) {
			this.users.delete(name);
			const users = Object.keys(this.users);
			this.SendMessage(
				'user_disconnected',
				users.filter((name) => name !== client.data.name),
				users
			);
		}
	}

	@SubscribeMessage('handshake')
	handleHandshake(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody() data: string
	) {
		console.info(`Handshake received from [${client.data.name}]`);

		const reconnected = Object.keys(this.users).includes(client.data.name);

		if (reconnected) {
			console.info(`User [${client.data.name}] has reconnected`);
			const name = this.GetNameFromSocketId(client.id);
			if (name) {
				return;
			}
		}

		this.users.set(client.data.name, client);
		const users = Object.keys(this.users);

		console.info('Sending callback for handshake...');
		this.server.to(client.id).emit('handshake', client.data.name, users);
		this.SendMessage(
			'user_connected',
			users.filter((name) => name !== client.data.name),
			users
		);
	}

	public getClient(username: string): AuthenticatedSocket {
		const client = this.users.get(username);
		if (!client) throw new WsException(`Client [${username}] doesn't exist`);
		return client;
	}

	GetNameFromSocketId = (id: string) => {
		return [...this.users.keys()].find((key) => key.includes(id));
	};

	SendMessage = (name: string, users: string[], payload?: Object) => {
		console.info(`Emitting event: ` + name + ` to `, users);
		users.forEach((username) =>
			payload
				? this.server
						.to(this.users.get(username)?.id as string)
						.emit(name, payload)
				: this.server.to(this.users.get(username)?.id as string).emit(name)
		);
	};
}
