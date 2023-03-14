import {ForbiddenException, Injectable, Post} from '@nestjs/common';
import {PrismaService} from 'src/database/prisma.service';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import {Request} from 'express';
import {BlockedService} from 'src/social/blocked/blocked.service';

@Injectable({})
export class UserService {
	constructor(
		private prisma: PrismaService,
		private blockedService: BlockedService
	) {}

	async getAllUsers(blockedOf: string) {
		try {
			const blockedUsers = await this.blockedService.getBlockedOfUser(
				blockedOf
			);

			const users = await this.prisma.user.findMany({});

			return users.filter((user) =>
				blockedUsers
					? !blockedUsers.some((blockedUser: any) => blockedUser.id === user.id)
					: true
			);
		} catch (error) {
			throw error;
		}
	}

	async getUserByName(name: string, blockedOf: string) {
		try {
			const users = await this.getAllUsers(blockedOf);
			const user = users.find((u) => u.name === name);
			return user;
		} catch (error) {
			throw error;
		}
	}

	async updateUser(req: Request) {
		try {
			const {name} = req.params;
			const user = await this.prisma.user.update({
				where: {
					name,
				},
				data: req.body,
			});
			return user;
		} catch (error) {
			throw error;
		}
	}

	async deleteAllUsers() {
		try {
			const user = await this.prisma.user.deleteMany({});
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getUserByEmail(email: string) {
		try {
			const user = await this.prisma.user.findFirst({
				where: {
					email: email,
				},
			});
			return user;
		} catch (error) {
			throw error;
		}
	}
}
