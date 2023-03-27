import { HttpException, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Request, Response } from 'express';


@Injectable()
export class DisableService {
	constructor( private readonly prisma: PrismaService) {}

	async disable2FA(@Req() req: Request, @Res() res: Response) {
		try {
			const updatedUser = await this.updateUser(req);
				res.status(200).json({
				user: {
					id: updatedUser.id,
					name: updatedUser.name,
					email: updatedUser.email,
					otp_enabled: updatedUser.otp_enabled,
				},
				});
			} catch (error) {
				throw new HttpException({
					status: HttpStatus.BAD_REQUEST,
					error: "Error to disable the 2FA"},
					 HttpStatus.BAD_REQUEST);
			}

	}
	
	async updateUser(@Req() req: Request) {
		try {
			const { userName } = req.body;
			const updatedUser = await this.prisma.user.update({
			where: {name : userName},
			data: {
				otp_enabled: false,
				otp_validated : false,
			},
			});
			console.log(updatedUser.otp_enabled, updatedUser.otp_validated);
			return updatedUser;
		}
		catch(error)
		{
			throw new HttpException({
				status: HttpStatus.BAD_REQUEST,
				error: "Fail to update user in Disable 2FA "},
				 HttpStatus.BAD_REQUEST);
		}
	}

}
