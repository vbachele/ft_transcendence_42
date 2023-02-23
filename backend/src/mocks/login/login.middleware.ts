import { Injectable, NestMiddleware, Req } from "@nestjs/common";
import { NextFunction, Request } from "express";

@Injectable()
export class LoginMiddleware implements NestMiddleware {
    use(@Req() request: Request, next: NextFunction) {
        
    }
}