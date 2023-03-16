import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Oauth42Service } from "src/auth/auth42/Oauth42.service";
import { Request, Response } from "express";
import { UserService } from "src/api/users/users.service";
import { UserDto } from "./dto";
// import { GoogleAuthGuard } from "./google-auth/guards";
import { GoogleService } from "./google-auth/google.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private Oauth42: Oauth42Service,
    private userService: UserService,
    private googleService: GoogleService
  ) {}
  /***  Create the user in database from the page registration ***/
  @Get("getuserbytoken")
  async getUserByToken(@Req() req: Request) {
    return this.authService.getUserByToken(req);
  }
  @Post("Oauth")
  async userOauthCreationInDataBase(@Req() req: Request, @Res() res: Response, @Body() UserDto: UserDto) {
   await this.authService.handleDataBaseCreation(req, res, UserDto);
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

  @Get("google/redirect")
  // @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirection(@Req() req: Request, @Res() res: Response) {

    const codeFromUrl = req.query.code as string;
    const token: any = await this.googleService.getTokenFromGoogle(codeFromUrl);
    const userInfos : any = await this.googleService.getUserFromGoogle(token);
    this.authService.createCookies(res, userInfos);
    const userExists = await this.userService.getUserByEmail(userInfos.email);
    this.authService.updateCookies(res, token, userExists);
    this.authService.RedirectConnectingUser(res, userExists?.email);
  }
}
