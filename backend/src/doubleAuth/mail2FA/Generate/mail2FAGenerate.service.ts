import { MailerService } from '@nestjs-modules/mailer';
import { Catch, HttpException, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class Mail2FaGenerateService {
	constructor(private readonly mailerService : MailerService, 
		private prisma: PrismaService) {}

/* SEND 2FA ACTIVATION EMAIL in settings page */
	async send2FAActivationMail(@Req() req: Request, @Res() res: Response)
	{
		try {
			const email = await this.getUserEmail(req);
			const code2FA = this.generateRandomCode(6); 
			this.sendEmailToUser(email, req, code2FA);
			await this.storeCodeToDataBase(code2FA, req)
			res.status(200).json({
				email,
		});
		}
		catch(e) {
		throw new HttpException({
			status: HttpStatus.BAD_REQUEST,
			error: "Invalid email"},
			 HttpStatus.BAD_REQUEST);
		}
	}	
		
		// update the database and hash the password

	async getUserEmail(@Req() req: Request) : Promise<string> 
	{
		try {
			const { userName } = req.body;
			const user = await this.prisma.user.findUnique({ where: { name : userName} }); // to change by the name or real ID
			console.log("USER EMAIL IS", user?.email)
			return user?.email!;

		} catch (error) {
			throw new HttpException({
			status: HttpStatus.BAD_REQUEST,
			error: "Invalid email, it must be 42 email or google email"},
			 HttpStatus.BAD_REQUEST);
		}
		}

	generateRandomCode(length: number): string {
		let result = '';
		const characters = '0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	  }

	sendEmailToUser(email: string, @Req() req: Request, code2FA: string) {
		const {userName} = req.body;
		this.mailerService.sendMail({
			to: `${email}`,
			from: 'versus.transcendence@gmail.com',
			subject: 'Your confirmation code for transcendence app',
			text:'Versus, two side one victory',
			html: `<b>Bonjour ${userName}</b><p>Your confirmation code is: ${code2FA}</p>`,
		})
	}

	async storeCodeToDataBase(code2FA: string, @Req() req: Request)
	{
		try {
			const saltOrRounds = 10;
			const password = code2FA;
			const hash = await bcrypt.hash(password, saltOrRounds);
			const { userName } = req.body;
			await this.prisma.user.update({
				where: { name:  userName}, // to change by the id/name of the request
				data: {token_mail: hash},
			})
		} catch(error) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: "Error to store email in database"},
				HttpStatus.BAD_REQUEST);
		}
	}
}
