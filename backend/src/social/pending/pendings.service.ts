import {Injectable, Post} from '@nestjs/common';
import {PrismaService} from 'src/database/prisma.service';
import {Request} from 'express';

@Injectable({})
export class PendingService {
	constructor(private prisma: PrismaService) {}

	async getPendingsOfUser(name: string) {
		try {
			const pendings = await this.prisma.user.findFirst({
				where: {
					name: name,
				},
				include: {pendings: true},
			});
			return pendings?.pendings;
		} catch (error) {
			throw error;
		}
	}

	async addPending(user1: string, user2: string) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: user1},
				include: {pendings: true},
				data: {
					pendings: {
						connect: {name: user2},
					},
				},
			});
			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	async removePending(user1: string, user2: string) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: user1},
				include: {pendings: true},
				data: {
					pendings: {
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
