import {Body, Controller, Delete, Get, Patch, Req} from '@nestjs/common';
import {UserService} from './achievements.service';
import {Request} from 'express';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}
	@Get()
	async getUsers() {
		return this.userService.getAllUsers();
	}
	@Get(':name')
	async getUserByName(@Req() req: Request) {
		return this.userService.getUserByName(req);
	}
	@Patch(':id')
	async PatchUser(@Req() req: Request) {
		return this.userService.updateUser(req);
	}
	@Delete('deleteall')
	async DeleteAllUsers() {
		return this.userService.deleteAllUsers();
	}
}
