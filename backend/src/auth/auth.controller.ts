import { Body, Controller, Patch, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Oauth42Service } from "src/api/Oauth42/Oauth42.service";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private Oauth42: Oauth42Service
  ) {}
  @Post("Oauth")
  async userOauthCreationInDataBase(@Req() req: Request) {
    const token = await this.Oauth42.accessToken(req.body.Oauth42);
    const user42infos = await this.Oauth42.access42UserInformation(
      token.access_token
    );
    const finalUser = await this.authService.createDataBaseUser(
      user42infos,
      token,
      req.body.name,
      req.body.isRegistered
    );
    return finalUser;
  }
}
