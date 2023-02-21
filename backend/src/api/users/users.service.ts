import { ForbiddenException, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request } from "express";

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({});
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserByName(req: Request) {
    try {
      const { name } = req.params;
      const user = await this.prisma.user.findFirst({
        where: {
          name,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(req: Request) {
    try {
      const { name } = req.params;
      const user = await this.prisma.user.update({
        where: {
          name,
        },
        data: req.body,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async deleteAllUsers() {
    try {
      const user = await this.prisma.user.deleteMany({});
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail(user42Name: string) {
    console.log(user42Name);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          user42Name,
        },
      });
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
