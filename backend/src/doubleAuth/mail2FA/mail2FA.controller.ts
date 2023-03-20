import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';import { Mail2FaGenerateService } from './Generate/mail2FAGenerate.service';
import { Mail2FaValidateService } from './Validate/mail2FAValidate.service';

@Controller('mail2FA')
export class Mail2FaController {
	constructor( private readonly generate2FA : Mail2FaGenerateService,
			private readonly validate2FA: Mail2FaValidateService ) {}

	@Post('sendEmail')
	async sendMail(@Req() req: Request, @Res() res: Response) : Promise<void> {
		await this.generate2FA.send2FAActivationMail(req, res);
	}

	@Post('Verify')
	async VerifyMail(@Req() req: Request, @Res() res: Response) : Promise<void> {
		await this.validate2FA.Validate2FA(req, res);
	}
}
