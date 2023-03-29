import {Injectable, Post} from '@nestjs/common';
import {PrismaService} from 'src/database/prisma.service';
import {Request} from 'express';
import {WebsocketService} from '../../websocket/websocket.service';
import {LobbyService} from '../../lobby/lobby.service';

@Injectable({})
export class BlockedService {
	constructor(private prisma: PrismaService,
							/*private readonly lobbyService: LobbyService*/) {}

	async getBlockedOfUser(name: string) {
		try {
			const blocked = await this.prisma.user.findFirst({
				where: {
					name: name,
				},
				include: {blocked: true},
			});
			return blocked?.blocked;
		} catch (error) {
			throw error;
		}
	}

	async getBlockedByUser(name: string) {
		try {
			const blockedOf = await this.prisma.user.findFirst({
				where: {
					name: name,
				},
				select: {blockedOf: true},
			});
			return blockedOf?.blockedOf;
		} catch (error) {
			throw error;
		}
	}

	async getBlocked(name: string) {
		const blockedOf = await this.getBlockedOfUser(name);
		const blockedBy = await this.getBlockedByUser(name);
		return [...(blockedOf ?? []), ...(blockedBy ?? [])]
	}

	async getBlockList(name: string) {
		const blockedOf = await this.getBlockedOfUser(name);
		const blockedBy = await this.getBlockedByUser(name);
		const users: string[] = [];
		blockedOf?.forEach((user) => (user.name ? users.push(user.name) : 0));
		blockedBy?.forEach((user) => (user.name ? users.push(user.name) : 0));
		return users;
	}

	async blockUser(user1: string, user2: string) {
		try {
			return await this.prisma.user.update({
				where: {name: user1},
				include: {blocked: true},
				data: {
					blocked: {
						connect: {name: user2},
					},
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async unblockUser(user1: string, user2: string) {
		try {
			return await this.prisma.user.update({
				where: {name: user1},
				include: {blocked: true},
				data: {
					blocked: {
						disconnect: {name: user2},
					},
				},
			});
		} catch (error) {
			throw error;
		}
	}
}
