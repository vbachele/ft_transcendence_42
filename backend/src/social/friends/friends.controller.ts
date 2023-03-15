import {Body, Controller, Delete, Get, Param, Patch, Req} from '@nestjs/common';
import {FriendService} from './friends.service';
import {Request} from 'express';
import {UserService} from 'src/api/users/users.service';

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
