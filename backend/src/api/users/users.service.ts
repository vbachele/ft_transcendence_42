import { ForbiddenException, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request} from "express";

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({});
      return users;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Error To catch users"},
         HttpStatus.BAD_REQUEST); 
        };
    }
  
  async getUserByName(name: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Error to find user by name"},
         HttpStatus.BAD_REQUEST); 
        };
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
      if (!user)
      {
        throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Error to update the user"
        },
          HttpStatus.BAD_REQUEST); 
      };
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Error to update the user"
        },
          HttpStatus.BAD_REQUEST); 
    }
  }
  
  async deleteAllUsers() {
    try {
      const user = await this.prisma.user.deleteMany({});
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Error to delete all user"},
         HttpStatus.BAD_REQUEST); 
        };
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      
  }
}
}


