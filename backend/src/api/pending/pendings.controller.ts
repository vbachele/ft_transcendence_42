import {Body, Controller, Delete, Get, Param, Patch, Req} from '@nestjs/common';
import {PendingService} from './pendings.service';
import {Request} from 'express';
import {UserService} from '../users/users.service';

//? a quoi ca sert, necessaire ou pas?
const express = require('express');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

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
