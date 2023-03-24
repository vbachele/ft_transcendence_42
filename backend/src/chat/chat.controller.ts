import { Controller, Param, Patch, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';

@Controller('chat')
export class ChatController {
	constructor (private readonly chatservice : ChatService) {}

@Patch(":chanName/password/:password")
async checkPassword(@Req() req: Request, @Res() res: Response, 	@Param('chanName') chanName: string, @Param('password') password: string) {
	await this.chatservice.checkPassword(req, res, chanName, password);
}
}
