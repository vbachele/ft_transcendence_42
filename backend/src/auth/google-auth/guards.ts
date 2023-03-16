import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// @Injectable()
// export class GoogleAuthGuard extends AuthGuard('google') {
// 	async canActivate(context: ExecutionContext) {		
// 		// console.log("je commence a vouloir etre active");
// 		// console.log(`ID: ${process.env.APIGOOGLE_ID}, SECRET: ${process.env.APIGOOGLE_SECRET}, URI: ${process.env.APIGOOGLE_URI}, URL: ${process.env.DATABASE_URL} `);
				
// 		const activate = (await super.canActivate(context)) as boolean;
// 		console.log(activate);
		
// 		const request = context.switchToHttp().getRequest();
// 		console.log(request);
		
// 		await super.logIn(request);
// 		return activate; 
// 	}
// }