import {ForbiddenException, Injectable, Post} from '@nestjs/common';
import {PrismaService} from 'src/database/prisma.service';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import {Request} from 'express';

@Injectable({})
export class DashboardService {
	constructor(private prisma: PrismaService) {}

	async getUserByName(name: string) {
		try {
			console.log(name);

			const user = await this.prisma.user.findUnique({
				where: {
					name: name,
				},
			});
			return user;
		} catch (error) {
			throw error;
		}
	}
}
