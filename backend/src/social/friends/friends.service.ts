import {Injectable, Post} from '@nestjs/common';
import {PrismaService} from 'src/database/prisma.service';
import {Request} from 'express';

@Injectable({})
export class FriendService {
	constructor(private prisma: PrismaService) {}

	async getFriendsOfUser(name: string) {
		try {
			const friends = await this.prisma.user.findFirst({
				where: {
					name: name,
				},
				include: {friends: true},
			});
			return friends?.friends;
		} catch (error) {
			throw error;
		}
	}

	async addFriend(user1: string, user2: string) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: user1},
				include: {friends: true},
				data: {
					friends: {
						connect: {name: user2},
					},
				},
			});
			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	async removeFriend(user1: string, user2: string) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {name: user1},
				include: {friends: true},
				data: {
					friends: {
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
