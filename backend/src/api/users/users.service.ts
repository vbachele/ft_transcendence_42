import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {PrismaService} from 'src/database/prisma.service';
import {BlockedService} from 'src/social/blocked/blocked.service';
import {WebsocketService} from '../../websocket/websocket.service';

@Injectable({})
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly blockedService: BlockedService,
		private readonly websocketService: WebsocketService,
	) {}

	async getAllUsers(blockedOf: string) {
		try {
			const users = await this.prisma.user.findMany({});
			const blockedUsers = await this.blockedService.getBlocked(
				blockedOf
			);

			return users.filter((user) =>
				blockedUsers
					? !blockedUsers.some((blockedUser: any) => blockedUser.id === user.id)
					: true
			);
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Error to catch users',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async getUserByName(name: string, blockedOf: string) {
		try {
			const users = await this.getAllUsers(blockedOf);
			const user = users.find((u) => u.name === name);
			return user;
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Error to find user by name',
				},
				HttpStatus.BAD_REQUEST
			);
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
			if (!user) {
				throw new HttpException(
					{
						status: HttpStatus.BAD_REQUEST,
						error: 'Error to update the user',
					},
					HttpStatus.BAD_REQUEST
				);
			}
			this.websocketService.updateClient(user.name!);
			return user;
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Error to update the user',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async deleteAllUsers() {
		try {
			const user = await this.prisma.user.deleteMany({});
			return user;
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Error to delete all user',
				},
				HttpStatus.BAD_REQUEST
			);
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
		} catch (error) {}
	}
}
