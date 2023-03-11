import {Body, Controller, Delete, Get, Param, Patch, Req} from '@nestjs/common';
import {FriendService} from './friends.service';
import {Request} from 'express';
import {UserService} from '../users/users.service';

//? a quoi ca sert, necessaire ou pas?
const express = require('express');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

@Controller('friends')
export class FriendController {
	userService: UserService;
	constructor(private friendService: FriendService) {}

	@Get(':name')
	async getFriends(@Req() req: Request) {
		return this.friendService.getFriendsOfUser(req.params.name);
	}

	@Patch(':user1/add/:user2')
	async addFriend(
		@Param('user1') user1: string,
		@Param('user2') user2: string
	) {
		return this.friendService.addFriend(user1, user2);
	}

	@Delete(':user1/remove/:user2')
	async removeFriend(
		@Param('user1') user1: string,
		@Param('user2') user2: string
	) {
		return this.friendService.removeFriend(user1, user2);
	}
}
