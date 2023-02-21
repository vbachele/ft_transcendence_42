import { ForbiddenException, Injectable, Post } from "@nestjs/common";
import { UserService } from "src/api/users/users.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}
  async createDataBaseUser(
    user42: any,
    token: any,
    name: string,
    isRegistered: boolean
  ) {
    try {
      const user = await this.prisma.user.create({
        data: {
          coalition: user42.coalition,
          achievements: [],
          accessToken: token.access_token,
          isRegistered: isRegistered,
          refreshToken: token.refresh_token,
          user42Name: user42.login,
          name: name,
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
}
