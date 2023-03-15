import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Req,
	Res,
} from '@nestjs/common';
import {UserService} from './users.service';
import {Request, Response} from 'express';
import {CloudinaryService} from 'src/cloudinary/cloudinary.service';
import {FindOneParams, UserDto} from 'src/auth/dto';

const express = require('express');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

@Controller('users')
export class UserController {
	constructor(
		private userService: UserService,
		private cloudinaryService: CloudinaryService
	) {}
	@Get(':name')
	async getUserByName(@Req() req: Request) {
		return this.userService.getUserByName(req.params.name, 'louis');
	}
	@Get()
	async getUsers() {
		// const currentUser = req.user; //TODO passer le currentUser dans les param
		return this.userService.getAllUsers('louis');
	}
	/***  Here we check it the request if an image to update otherwise we update the user ***/
	@Patch(':name')
	async PatchUser(@Req() req: Request) {
		if (req.body.image) {
			const user = this.cloudinaryService.uploadImage(req);
			return user;
		}

		return this.userService.updateUser(req);
	}

	/*** get the user info thanks to its token ***/

	@Delete('deleteall')
	async DeleteAllUsers() {
		return this.userService.deleteAllUsers();
	}
}
