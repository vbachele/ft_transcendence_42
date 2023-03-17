import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";


@Injectable()
export class sessionSerializer extends PassportSerializer {
	constructor(private authService: AuthService ) 
	{super()}

	serializeUser(user: User, done: Function) {
		console.log("serialize user");
		done(null, user);
		
	}

	async deserializeUser(payload: any, done: Function) {
		const user = await this.authService.getUserByToken(payload.token)
		console.log("deserialize user");
		console.log("user");
		return user ? done(null, user) : done(null, null);
	}

}