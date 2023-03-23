import {Injectable} from '@nestjs/common';
import {Server} from 'socket.io';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {PrismaService} from 'src/database/prisma.service';
import {Socket} from 'dgram';

@Injectable()
export class WebsocketService {
	constructor(private readonly prisma: PrismaService) {}

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

	public async updateStatus(
		@ConnectedSocket() client: AuthenticatedSocket,
		type: string
	) {
		switch (type) {
			case 'online':
				this.setOnline(client);
				break;
			case 'busy':
				this.setBusy(client);
				break;
			case 'offline':
				this.setOffline(client);
				break;
			default:
				break;
		}

		/*
			if deco
			timeout 5sec
			into check if this.get.client pour voir si il est co
		 *
		 */
	}

	private async setOnline(@ConnectedSocket() client: AuthenticatedSocket) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: client.data.name},
				data: {
					status: 'online',
				},
			});
			this.sendMessage(client, 'UPDATE_STATUS', {
				status: 'online',
				user: client.data.name,
			});

			return updatedUser;
		} catch (error) {
			throw new WsException('Failed to update status of user');
		}
	}

	private async setBusy(@ConnectedSocket() client: AuthenticatedSocket) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: client.data.name},
				data: {
					status: 'ingame',
				},
			});
			this.sendMessage(client, 'UPDATE_STATUS', {
				status: 'ingame',
				user: client.data.name,
			});
			return updatedUser;
		} catch (error) {
			throw new WsException('Failed to update status of user');
		}
	}

	private async setOffline(@ConnectedSocket() client: AuthenticatedSocket) {
		setTimeout(async () => {
			if (!this.getClient(client.data.name)) {
				try {
					const updatedUser = await this.prisma.user.update({
						where: {name: client.data.name},
						data: {
							status: 'offline',
						},
					});
					this.sendMessage(client, 'UPDATE_STATUS', {
						status: 'offline',
						user: client.data.name,
					});
					return updatedUser;
				} catch (error) {
					throw new WsException('Failed to update status of user');
				}
			}
		}, 5_000);
	}
}
