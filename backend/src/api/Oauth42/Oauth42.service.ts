import { Body, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { response } from "express";

@Injectable()
export class Oauth42Service {
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
      if (!response.ok) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "User 42 infos json is empty"
          },
           HttpStatus.BAD_REQUEST); 
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new ForbiddenException("Token is invalid");
    }
  }
}