import { HttpException, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Request, Response } from 'express';
// import * as bcrypt from 'bcrypt';



@Injectable()
export class Mail2FaValidateService {
	constructor( private readonly prisma: PrismaService) {}

	async Validate2FA(@Req() req: Request, @Res() res: Response)
	{
		try {

			const { userName, token} = req.body;
			const user = await this.prisma.user.findUnique({ where: { name : userName.userName} }); // to change by the name or real ID
			//  const {token_mail} = user.token_mail;
			//  const isMatch = await bcrypt.compare(token, token);
			 await this.updateUser(userName)
			res.status(200).json({otp_verified: true,})
		}catch(e) {
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: "Impossible to validate 2FA"},
				 HttpStatus.BAD_REQUEST);
			}

	}

	async updateUser(userName : any)
	{
		try {
		const updatedUser = await this.prisma.user.update({
			where: { name : userName.userName },
			data: {
			  otp_enabled: true,
			  otp_verified: true,
			},
		  });
		}
		catch(error){
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: "Impossible to update user in validate2FA"},
				 HttpStatus.BAD_REQUEST);
		}
	}
}
