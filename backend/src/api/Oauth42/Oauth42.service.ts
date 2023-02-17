import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { response } from "express";

@Injectable()
export class Oauth42Service {
  async accessToken(req: string) {
    try {
      const response = await fetch("https://api.intra.42.fr/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=authorization_code&client_id=${process.env.API42_ID}&client_secret=${process.env.API42_SECRET}&code=${req}&redirect_uri=http://localhost:5173/registration`,
      });
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async access42UserInformation(accessToken: string) {
    try {
      const response = await fetch("https://api.intra.42.fr/v2/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch user information: ${response.statusText}`
        );
      }
      const data = await response.json();
      //   this.access42RefreshToken();
      return data;
    } catch (error) {
      if (!accessToken)
        throw new ForbiddenException(
          'If this error appears twice on the console during developmentplease get a new access code from "Join the battle"'
        );
    }
  }

  //   async access42RefreshToken() {
  //     try {
  //       const response = await fetch("https://api.intra.42.fr/oauth/token", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //         body: `grant_type=refresh_token&client_id=${process.env.API42_ID}&client_secret=${process.env.API42_SECRET}&refresh_token=c288bf542c38a34f759fcd3b572be3804e006efd464d5fa814417b36024cb53d`,
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //       //   return data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}
