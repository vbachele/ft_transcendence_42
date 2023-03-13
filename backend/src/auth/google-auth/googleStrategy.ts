import {Injectable, Req, Res } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import {Response} from "express"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(
		private authService: AuthService,
	) {
		super({
			clientID: process.env.APIGOOGLE_ID,
			clientSecret: process.env.APIGOOGLE_SECRET,
			callbackURL: process.env.APIGOOGLE_URI,
			scope: ['profile', 'email'],
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile, @Res() res: Response) {
		let userInfos = {
			email: profile.emails![0].value,
			userName: profile.displayName,
		}
		const user = await this.authService.createUserFromGoogle(userInfos, accessToken);
		return user;
	}
}