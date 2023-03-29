import {Body, Controller, Delete, Get, Param, Patch, Req} from '@nestjs/common';
import {BlockedService} from './blocked.service';
import {Request} from 'express';
import {UserService} from 'src/api/users/users.service';

@Controller('blocked')
export class BlockedController {
	userService: UserService;
	constructor(private blockedService: BlockedService) {}

	@Get(':name')
	async getBlocked(@Req() req: Request) {
		return await this.blockedService.getBlockedOfUser(req.params.name);
	}

	@Patch(':user1/block/:user2')
	async blockUser(
		@Param('user1') user1: string,
		@Param('user2') user2: string
	) {
		return this.blockedService.blockUser(user1, user2);
	}

	@Delete(':user1/unblock/:user2')
	async unblockUser(
		@Param('user1') user1: string,
		@Param('user2') user2: string
	) {
		return this.blockedService.unblockUser(user1, user2);
	}
}
