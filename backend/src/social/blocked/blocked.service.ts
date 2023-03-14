import {Injectable, Post} from '@nestjs/common';
import {PrismaService} from 'src/database/prisma.service';
import {Request} from 'express';

@Injectable({})
export class BlockedService {
	constructor(private prisma: PrismaService) {}

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

	async blockUser(user1: string, user2: string) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: user1},
				include: {blocked: true},
				data: {
					blocked: {
						connect: {name: user2},
					},
				},
			});
			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	async unblockUser(user1: string, user2: string) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: user1},
				include: {blocked: true},
				data: {
					blocked: {
						disconnect: {name: user2},
					},
				},
			});
			return updatedUser;
		} catch (error) {
			throw error;
		}
	}
}
