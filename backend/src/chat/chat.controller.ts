import { Controller, Param, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
import { AdminGuard } from './guards/admin.guard';

@Controller('chat')
export class ChatController {
	constructor (private readonly chatservice : ChatService) {}

@Patch(":chanName/password/:password")
async checkPassword(@Req() req: Request, @Res() res: Response, 	@Param('chanName') chanName: string, @Param('password') password: string) {
	await this.chatservice.checkPassword(req, res, chanName, password);
}

// @UseGuards(AdminGuard)
@Patch(":chanName/modifypassword/:password")
async modifyPassword(@Req() req: Request, @Res() res: Response, @Param('chanName') chanName: string, @Param('password') password: string) {
	await this.chatservice.modifyPassword(req, res, chanName, password);
}

@Patch(":chanName/modifydescription/:description")
async modifyDescription(@Req() req: Request, @Res() res: Response, @Param('chanName') chanName: string, @Param('description') description: string) {
	await this.chatservice.modifyDescription(req, res, chanName, description);
}
}
