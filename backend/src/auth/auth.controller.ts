import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Oauth42Service } from "src/api/Oauth42/Oauth42.service";
import { Request, Response } from "express";
import { UserService } from "src/api/users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private Oauth42: Oauth42Service,
    private userService: UserService
  ) {}
  /***  Create the user in database from the page registration ***/
  @Post("Oauth")
  async userOauthCreationInDataBase(@Req() req: Request) {
    const token = req.cookies.token;
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

  /***  After the user said yes to connect to 42 API, we attribute the token and we check if he exists in the database ***/
  @Get("callback")
  async getToken(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;
    const token = await this.Oauth42.accessToken(code);
    const user42infos = await this.Oauth42.access42UserInformation(
      token.access_token
    );
    res.cookie("token", token);
    const userExists = await this.userService.getUserByEmail(user42infos.login);
    if (!userExists?.name)
      res.redirect(301, `http://localhost:5173/registration`);
    else res.redirect(301, `http://localhost:5173/login`);
  }
}
