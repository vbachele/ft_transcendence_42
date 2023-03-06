import { Controller, Get, Post, Redirect, Req, Res } from "@nestjs/common";
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
  async userOauthCreationInDataBase(@Req() req: Request, @Res() res: Response) {
    const token: string = req.cookies.token;
    const user42infos = await this.Oauth42.access42UserInformation(token);
    const finalUser = await this.authService.createDataBaseUser(
      res,
      user42infos,
      token,
      req.body.name,
      req.body.isRegistered
    );
    return res.status(200).json({
      statusCode: 200,
      path: finalUser,
    });
  }

  /***  After the user said yes to connect to 42 API, we attribute the token and we check if he exists in the database ***/
  @Get("callback")
  async getToken(@Req() req: Request, @Res() res: Response) {
    const codeFromUrl = req.query.code as string;
    const token = await this.Oauth42.accessToken(codeFromUrl);
    const user42infos = await this.Oauth42.access42UserInformation(
      token.access_token
    );
    this.authService.createCookies(res, token);
    const userExists = await this.userService.getUserByEmail(user42infos.email);
    this.authService.updateCookies(res, token, userExists);
    this.authService.RedirectConnectingUser(res, userExists?.email);
  }

  @Get("logout")
  async deleteCookies(@Req() req: Request, @Res() res: Response) {
    this.authService.deleteCookies(res);
  }

  @Get("token")
  async checkIfTokenValid(@Req() req: Request, @Res() res: Response) {
    return this.authService.checkIfTokenValid(req, res);
  }
}
