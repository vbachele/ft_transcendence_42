import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "src/database/prisma.service";
var speakeasy = require("speakeasy");

@Injectable({})
export class DoubleAuthService {
	constructor(private prisma: PrismaService) {}
	async GenerateOTP(req: Request, res: Response) {
		console.log("entrypoint generate")
		try {
		  const { userName } = req.body;
		  const { ascii, hex, base32, otpauth_url } = speakeasy.generateSecret({
			issuer: "vcbachelet@gmail.com",
			name: "Transcendence",
			length: 15,
		  });
		  await this.prisma.user.update({
			where: { name:  userName}, // to change by the id/name of the request
			data: {
			  otp_ascii: ascii,
			  otp_auth_url: otpauth_url,
			  otp_base32: base32,
			  otp_hex: hex,
			},
		  });
		  res.status(200).json({
			base32,
			otpauth_url,
		  });
		} catch (error) {
		  res.status(500).json({
			status: "error",
			message: error.message,
		  });
		}
	  };

	async VerifyOTP(req: Request, res: Response) {
			try {
			  const { userName, token} = req.body;
			  const user = await this.prisma.user.findUnique({ where: { name : userName.userName} }); // to change by the name or real ID
			  const message = "Token is invalid or user doesn't exist";
			  if (!user) {
				return res.status(401).json({
				  status: "fail",
				  message,
				});
			  }
			  const verified = speakeasy.totp.verify({
				secret: user.otp_base32!,
				encoding: "base32",
				token,
			  });

		  
			  if (!verified) {
				return res.status(401).json({
				  status: "fail",
				  message,
				});
			  }
			  const updatedUser = await this.prisma.user.update({
				where: { name : userName.userName },
				data: {
				  otp_enabled: true,
				  otp_verified: true,
				},
			  });
			  res.status(200).json({
				otp_verified: true,
				user: {
				  id: updatedUser.id,
				  name: updatedUser.name,
				  email: updatedUser.email,
				  otp_enabled: updatedUser.otp_enabled,
				},
			  });
			} catch (error) {
			  res.status(500).json({
				status: "error",
				message: error.message,
			  });
			}
		  };
	
	async ValidateOTP(req: Request, res: Response) {
			try {
			const { userName, token} = req.body;
			  const user = await this.prisma.user.findUnique({ where: { name : userName.userName} });
			  const message = "Token is invalid or user doesn't exist";
			  if (!user) {
				return res.status(401).json({
				  status: "fail",
				  message,
				});
			  }
		  
			  const validToken = speakeasy.totp.verify({
				secret: user.otp_base32!,
				encoding: "base32",
				token,	
				 });
			  if (!validToken) {
				return res.status(401).json({
				  status: "fail",
				  message,
				});
			  }
		  
			  res.status(200).json({
				otp_valid: true,
			  });
			  const updatedUser = await this.prisma.user.update({
				where: { name : userName.userName },
				data: {
					otp_validated : true,
				},
			  });
			  res.status(200).json({
				user: {
				  id: updatedUser.id,
				  name: updatedUser.name,
				  email: updatedUser.email,
				  otp_validated: updatedUser.otp_validated,
				},
			  });
			} catch (error) {
			  res.status(500).json({
				status: "error",
				message: error.message,
			  });
			}
		  };
	
	async DisableOTP(req: Request, res: Response){
	try {
		const { userName } = req.body;
		const user = await this.prisma.user.findUnique({ where: {name : userName} });
		if (!user) {
		return res.status(401).json({
			status: "fail",
			message: "User doesn't exist",
		});
		}
		const updatedUser = await this.prisma.user.update({
		where: {name : userName},
		data: {
			otp_enabled: false,
			otp_validated : false,
		},
		});
		console.log(updatedUser);
		res.status(200).json({
		otp_disabled: true,
		user: {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			otp_enabled: updatedUser.otp_enabled,
		},
		});
	} catch (error) {
		res.status(500).json({
		status: "error",
		message: error.message,
		});
	}
	};	  
}