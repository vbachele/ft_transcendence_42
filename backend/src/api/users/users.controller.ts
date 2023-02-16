import {Body, Controller, Delete, Get, Patch, Req} from '@nestjs/common';
import {UserService} from './users.service';
import {Request} from 'express';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}
	@Get()
	async getUsers() {
		return this.userService.getAllUsers();
	}
	// @Get(':id')
	// async getOneUser(@Req() req: Request) {
	// 	const {id} = req.params;
	// 	return this.userService.getOneUser(req);
	// }
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
