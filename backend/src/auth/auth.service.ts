import { BadRequestException, Injectable, Req, Res } from "@nestjs/common";
import { UserService } from "src/api/users/users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response, request } from "express";
import { Oauth42Service } from "src/api/Oauth42/Oauth42.service";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private Oauth42: Oauth42Service
  ) {}
  async createDataBaseUser(
    @Res() res: Response,
    user42: any,
    token: string,
    name: string,
    isRegistered: boolean
  ) {
    try {
      const user = await this.prisma.user.create({
        data: {
          coalition: user42.coalition,
          achievements: [],
          accessToken: token,
          isRegistered: isRegistered,
          user42Name: user42.login,
          name: name,
          email: user42.email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkIfUserExists(email: any) {
    const userExists = await this.userService.getUserByEmail(email);
    return userExists;
  }

  async RedirectConnectingUser(
    @Res() res: Response,
    email: string | null | undefined
  ) {
    if (!email) res.redirect(301, `http://localhost:5173/registration`);
    else res.redirect(301, `http://localhost:5173/`);
  }

  async createCookies(@Res() res: Response, token: any) {
    res.cookie("token", token.access_token),
      {
        expires: new Date(new Date().getTime() + 60 * 24 * 7 * 1000), // expires in 7 days
        httpOnly: true, // for security
      };
  }

  async deleteCookies(@Res() res: Response) {
    res.clearCookie("token").end();
  }

  async checkIfTokenValid(@Req() req: Request, @Res() res: Response) {
    const token: string = req.cookies.token;
    const tokenValid = await this.Oauth42.access42UserInformation(token);
    if (!tokenValid) {
      throw new BadRequestException("InvalidToken", {
        cause: new Error(),
        description: "Json empty, the token is invalid",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      path: request.url,
    });
  }
}
