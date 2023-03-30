import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { UserService } from "src/api/users/users.service";
import { PrismaService } from "src/database/prisma.service";
import {google} from 'googleapis'
import { Request, Response } from "express";
import { UserDetails } from "./types";


@Injectable({})
export class GoogleService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}


/* CREATE USER FROM GOOGLE IN DATABASE */

async handleGoogleUserCreation(@Res() res: Response, @Req() req: Request) {

  try {
    const userGoogleInfos = await this.getUserFromGoogleByCookies(req)
    if (userGoogleInfos) {
      const finalUser = await this.createDataBaseUserFromGoogle
    (
      res,
      userGoogleInfos,
      req.body.name,
      req.body.isRegistered
    )
      return res.status(200).json(
      {
        statusCode: 200,
        path: finalUser,
      });
  }} catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Error to create the user to the database"
      }, HttpStatus.BAD_REQUEST);
    };
}


async createDataBaseUserFromGoogle(
    @Res() res: Response,
    userGoogle: any,
    name: string,
    isRegistered: boolean

  ) {
    try {
      const coalition = this.chooseRandomString();
      const user = await this.prisma.user.create({
        data: {
          coalition: coalition,
          achievements: [],
          accessToken: userGoogle.access_token,
          isRegistered: isRegistered,
          user42Name: "User not from 42",
          name: name,
          email: userGoogle.email,
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

/* GET FUNCTIONS  */

  async getOauth2ClientGoogle() {
    const oauth2Client = new google.auth.OAuth2(
      '28591145240-gpha0h1g8rkbldlvvc5dfc59gkaf4n7s.apps.googleusercontent.com',
      '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',
      'http://localhost:5173/api/auth/google/redirect'
    );

    // generate a url that asks permissions for Blogger and Google Calendar scopes
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      scope: scopes
    });
    return oauth2Client;
  }

  async getTokenFromGoogle(code :string)
  {
    const oauth2Client = await this.getOauth2ClientGoogle();
    const {tokens} = await oauth2Client.getToken(code);
    const token = {
      access_token: tokens.access_token,
    }
    return token;
  }

  async getUserFromGoogle(tokens: any) {
    try {
    const oauth2Client = await this.getOauth2ClientGoogle();
    await oauth2Client.setCredentials(tokens);
    const { data } = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    let userInfos = {
			email: data.email,
      access_token: tokens.access_token,
		}
    return userInfos;
  }
  catch(error) {
    console.log("Fetch google user doesnt work, next step is testing with 42api")
  }
    return null;
  }

  async getUserFromGoogleByCookies(@Req() req: Request) {
    const token: string = req.cookies.FullToken;
    const data = await this.getUserFromGoogle(token)
    return data;
  }

  chooseRandomString() {
    const strings = ["Federation", "Order", "Assembly", "Alliance"];
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
  }
}