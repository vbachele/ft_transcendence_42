import {Body, Controller, Delete, Get, Param, Patch, Req} from '@nestjs/common';
import {PendingService} from './pendings.service';
import {Request} from 'express';
import {UserService} from '../users/users.service';

@Controller('pendings')
export class PendingController {
	userService: UserService;
	constructor(private pendingService: PendingService) {}

	@Get(':name')
	async getPendings(@Req() req: Request) {
		return this.pendingService.getPendingsOfUser(req.params.name);
	}

	@Patch(':user1/add/:user2')
	async addPending(
		@Param('user1') user1: string,
		@Param('user2') user2: string
	) {
		return this.pendingService.addPending(user1, user2);
	}

	@Delete(':user1/remove/:user2')
	async removePending(
		@Param('user1') user1: string,
		@Param('user2') user2: string
	) {
		return this.pendingService.removePending(user1, user2);
	}
}
