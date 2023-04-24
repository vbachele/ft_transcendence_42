import { BadRequestException, Body, HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { UserService } from "src/api/users/users.service";
import { Request, Response, request } from "express";
import { Oauth42Service } from "src/auth/auth42/Oauth42.service";
import { PrismaService } from "src/database/prisma.service";
import { GoogleService } from "./google-auth/google.service";
import { UserDto } from "./dto";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private Oauth42: Oauth42Service,
    private googleService: GoogleService
  ) {}

/* DATABASE Creation function */
async createDataBase42User(
  user42: any,
  token: string,
  username: string,
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
        name: username,
        email: user42.email,
      },
    });

    return user;
  } catch (error) {
    throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: "Error to create the user to the database"
    }, HttpStatus.BAD_REQUEST);
    };
}

  async handleDataBaseCreation(@Req() req: Request, @Res() res: Response, @Body() UserDto: UserDto) {
    const token: string = req.cookies.token;
    const user42infos = await this.Oauth42.access42UserInformation(token);
    if (user42infos)
      {
        const finalUser = await this.Oauth42.createDataBase42User(    user42infos,
        token,
        req.body.name,
        req.body.isRegistered);
        return res.status(200).json({
        statusCode: 200,
        path: finalUser,
      });
    }
    await this.googleService.handleGoogleUserCreation(res, req);
  }

  async RedirectConnectingUser(
    @Req() req: Request,
    @Res() res: Response,
    email: string | null | undefined
  ) {
    if (!email) res.redirect(301, `https://versus-transcendence.com/registration`);
    else res.redirect(301, `https://versus-transcendence.com/`);
  }

/* CHECK FUNCTIONS */

  async checkIfUserExists(email: any) {
    const userExists = await this.userService.getUserByEmail(email);
    return userExists;
  }

  async checkIfTokenValid(@Req() req: Request, @Res() res: Response) {
    const token: string = req.cookies.token;

    const token42Valid = await this.Oauth42.access42UserInformation(token); // check token from user if user is from 42
    const dataGoogleValid = await this.googleService.getUserFromGoogleByCookies(req); // check now if the token from google is valid
    if (!token42Valid && !dataGoogleValid) {
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

  /* GET FUNCTIONS */

  async getUserByToken(req: Request) {
    try {
      const accessToken = req.cookies.token;
      const user = await this.prisma.user.findFirst({
        where: {
          accessToken: accessToken,
        },
      });
      if (!user)
      {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "Error to get the user by token"},
           HttpStatus.BAD_REQUEST);
          };
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Error to get the user by token"},
         HttpStatus.BAD_REQUEST);
        };
  }

/* COOKIES MANAGEMENT */

  async createCookies(@Res() res: Response, token: any) {
    const cookies = res.cookie("token", token.access_token,
      {
        expires: new Date(new Date().getTime() + 60 * 24 * 7 * 1000), // expires in 7 days
        httpOnly: true, // for security
      });
      const Googlecookies = res.cookie("FullToken", token,
      {
        expires: new Date(new Date().getTime() + 60 * 24 * 7 * 1000), // expires in 7 days
        httpOnly: true, // for security
      });

  }

  async updateCookies(@Res() res: Response, token: any, userInfos: any) {
    try {
      if (userInfos)
      { const name = userInfos.name;
        const user = await this.prisma.user.update({where: {name: name,},
        data: {  accessToken: token.access_token,},
        });
        return user;
      }
      else
        return (null);
    } catch (error)
    {
        throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Error to update the cookes"},
        HttpStatus.BAD_REQUEST);
    }
    }

  async deleteCookies(@Res() res: Response) {
    try {
      res.clearCookie("token").clearCookie("FullToken").end();
    } catch (error)
    {
      throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: "Error to update the cookes"},
      HttpStatus.BAD_REQUEST);
  }
  }
}


