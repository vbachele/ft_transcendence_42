import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { response } from "express";

@Injectable()
export class Oauth42Service {
  async access42Code() {
    // try {
    //   const response = await fetch(`${process.env.API42_ACCESSURL}`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   console.log(response);
    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   throw error;
    // }
  }

  async accessToken(req: string) {
    try {
      const response = await fetch("https://api.intra.42.fr/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=authorization_code&client_id=${process.env.API42_ID}&client_secret=${process.env.API42_SECRET}&code=${req}&redirect_uri=${process.env.API42_URI}`,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async access42UserInformation(accessToken: string) {
    console.log("42userinfos");
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
}
