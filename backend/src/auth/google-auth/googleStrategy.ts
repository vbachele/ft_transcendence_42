import { Injectable, Res } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { Response } from "express"

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy) {
// 	constructor(
// 		private authService : AuthService,
// 	) {
// 		super({
// 			clientID: '28591145240-gpha0h1g8rkbldlvvc5dfc59gkaf4n7s.apps.googleusercontent.com',
// 			clientSecret: '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',
// 			callbackURL: 'http://localhost:5173/api/auth/google/redirect',
// 			scope: ['profile', 'email'],
// 			})		
// 	}

// 	async validate(accessToken: string, refreshToken: string, profile: Profile, @Res() response: Response) {
		
// 		let userInfos = {
// 			email: profile.emails![0].value,
// 			userName: profile.displayName,
// 		}
// 		console.log(`accessToken: ${accessToken}, PROFILE: ${userInfos.email}`);
// 		// const user = await this.authService.createUserFromGoogle(userInfos, accessToken);
// 		return user;
// 	}
// }

