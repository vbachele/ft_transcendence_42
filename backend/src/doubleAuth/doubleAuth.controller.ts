import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { DoubleAuthService } from "./doubleAuth.service";

@Controller("2FA")
export class DoubleAuthController {
	constructor( private doubleAuthService : DoubleAuthService) {}

// @Post("generate")
// async GenerateOTP(@Req() req: Request, @Res() res: Response) {
// 	this.doubleAuthService.GenerateOTP(req, res);
// }
// @Post("verify")
// async VerifyOTP(@Req() req: Request, @Res() res: Response) {
// 	this.doubleAuthService.VerifyOTP(req, res);
// }
// @Post("validate")
// async ValidateOTP(@Req() req: Request, @Res() res: Response) {
// 	this.doubleAuthService.ValidateOTP(req, res);
// }
// @Post("disable")
// async DisableOTP(@Req() req: Request, @Res() res: Response) {
// 	this.doubleAuthService.DisableOTP(req, res);
// }
}
