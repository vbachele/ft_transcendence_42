import { ForbiddenException, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async createDataBaseUser(
    data: any,
    token: any,
    name: string,
    isRegistered: boolean
  ) {
    try {
      const user = await this.prisma.user.create({
        data: {
          coalition: data.coalition,
          achievements: [],
          accessToken: token.access_token,
          isRegistered: isRegistered,
          refreshToken: token.refresh_token,
          user42Name: data.login,
          name: name,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
