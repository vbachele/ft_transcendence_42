import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	Post,
} from '@nestjs/common';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import {Request} from 'express';
import { PrismaService } from 'src/database/prisma.service';
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
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Error To catch users',
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
