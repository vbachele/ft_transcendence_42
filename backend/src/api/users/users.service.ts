import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Post,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request } from "express";
import { CloudinaryService } from "src/utils/cloudinary.service";

@Injectable({})
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({});
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getOneUser(req: Request) {
    try {
      const { id } = req.params;

      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async uploadImageToCloudinary(file: string) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException("Invalid file type.");
    });
  }

  async updateUser(req: Request) {
    try {
      const { id } = req.params;
      const user = await this.prisma.user.update({
        where: {
          id: Number(id),
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
}
