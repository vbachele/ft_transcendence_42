import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Mail2FaValidateService } from './validate/validate2FA.service';
import { DisableService } from './disable/disable2Fa.service';
import { Mail2FaGenerateService } from './generate/generate2FA.service';

@Controller('2FA')
export class Mail2FaController {
	constructor( private readonly generate2FA : Mail2FaGenerateService,
			private readonly validate2FA: Mail2FaValidateService,
			private readonly disable2FA: DisableService ) {}

	@Post('sendEmail')
	async SendMail(@Req() req: Request, @Res() res: Response) : Promise<void> {
		await this.generate2FA.sendActivationMail(req, res);
	}

	@Post('verify')
	async VerifyMail(@Req() req: Request, @Res() res: Response) : Promise<void> {
		await this.validate2FA.validate2FA(req, res);
	}

	@Post('disable')
	async Disable(@Req() req: Request, @Res() res: Response) : Promise<void> {
		await this.disable2FA.disable2FA(req, res);
	}
}
