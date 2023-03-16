import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class Oauth42Service {
  constructor(
    private prisma: PrismaService) {}

  /* 42 API ACCESS */
  async accessToken(req: string) {
    try {
      const response = await fetch("https://api.intra.42.fr/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=authorization_code&client_id=${process.env.API42_ID}&client_secret=${process.env.API42_SECRET}&code=${req}&redirect_uri=${process.env.API42_URI}`,
      });
      const data = await response.json();      
      if (!data)
      {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "the user token is empty"
          },
           HttpStatus.BAD_REQUEST); 
        };
      return data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Error to get the user by token"},
         HttpStatus.BAD_REQUEST); 
        };
    }

  async access42UserInformation(accessToken: string) {    
    try {
      const response = await fetch("https://api.intra.42.fr/v2/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.ok) 
      { 
        const data = await response.json();
        return data;
      }
    }
    catch(error) {
      console.log("Fetch42 user doesnt work, next step is testing with googleapi")
    }
      return null;
  }

  async createDataBase42User(
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
      throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Error to create the user to the database"
      }, HttpStatus.BAD_REQUEST); 
      };
  }

  /* User creation from 42 in DATABASE */
  async handle42UserCreation(@Res() res: Response, user42infos: any, token: string, @Req() req: Request) {    
      const finalUser = await this.createDataBase42User(
        user42infos,
        token,
        req.body.name,
        req.body.isRegistered
      )
      return finalUser;
    }

}