import {Injectable} from '@nestjs/common';
import {Server} from 'socket.io';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {PrismaService} from 'src/database/prisma.service';
import {Socket} from 'dgram';
import {BlockedService} from '../social/blocked/blocked.service';

@Injectable()
export class WebsocketService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly blockedService: BlockedService
	) {}

	public server: Server;
	public clients: Map<string, AuthenticatedSocket> = new Map<
		string,
		AuthenticatedSocket
	>();

	public getClient(username: string): AuthenticatedSocket | undefined {
		return this.clients.get(username);
	}

	public addUser(@ConnectedSocket() client: AuthenticatedSocket) {
		this.clients.set(client.data.name, client);
	}

	public removeUser(@ConnectedSocket() client: AuthenticatedSocket) {
		this.clients.delete(client.data.name);
	}

	public sendMessage(
		@ConnectedSocket() client: AuthenticatedSocket,
		event: string,
		payload?: Object
	) {
		console.info(`Emitting event [${event}] to connected clients`);
		payload
			? client.broadcast.emit(event, payload)
			: client.broadcast.emit(event);
	}

	public async emitWithBlacklist(
		event: string,
		sender: string,
		payload?: Object
	) {
		this.clients.forEach(async (client) => {
			const blacklist = await this.blockedService.getBlockList(
				client.data.name
			);
			if (blacklist?.includes(sender)) return;
			this.server.to(client.id).emit(event, payload);
		});
	}

	public async updateStatus(
		@ConnectedSocket() client: AuthenticatedSocket,
		type: string
		) {
			switch (type) {
				case 'online':
					await this.setOnline(client);
				break;
			case 'busy':
				await this.setBusy(client);
				break;
			case 'offline':
				await this.setOffline(client);
				break;
			default:
				break;
		}
	}

	public updateClient(username: string) {
		const client = this.getClient(username);
		if (!client) return;
		this.clients.delete(client.data.name);
		client.data.name = username;
		this.addUser(client);
	}

	private async setOnline(@ConnectedSocket() client: AuthenticatedSocket) {
		try {
			await this.prisma.user.update({
				where: {name: client.data.name},
				data: {
					status: 'online',
				},
			});
			this.sendMessage(client, 'update_status', {
				status: 'online',
				user: client.data.name,
			});
			console.log(`${client.data.name} is now online`);
		} catch (error) {
			throw new WsException('Failed to update status of user');
		}
	}

	private async setBusy(@ConnectedSocket() client: AuthenticatedSocket) {
		try {
			await this.prisma.user.update({
				where: {name: client.data.name},
				data: {
					status: 'ingame',
				},
			});
			this.sendMessage(client, 'update_status', {
				status: 'ingame',
				user: client.data.name,
			});
			console.log(`${client.data.name} is now ingame`);
		} catch (error) {
			throw new WsException('Failed to update status of user');
		}
	}

	private async setOffline(@ConnectedSocket() client: AuthenticatedSocket) {
		setTimeout(async () => {
			if (!this.getClient(client.data.name)) {
				try {
					await this.prisma.user.update({
						where: {name: client.data.name},
						data: {
							status: 'offline',
						},
					});
					this.sendMessage(client, 'update_status', {
						status: 'offline',
						user: client.data.name,
					});
					console.log(`${client.data.name} is now offline`);
				} catch (error) {
					throw new WsException('Failed to update status of user');
				}
			}
		}, 5_000);
	}
}
