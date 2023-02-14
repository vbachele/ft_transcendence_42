import { ForbiddenException, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup() {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: "Vincent",
          image:
            "https://res.cloudinary.com/djdxw1y13/image/upload/v1676390380/Transcendence/default-avatar_hsktjo.png",
          coalition: "",
          status: "",
          games: 0,
          wins: 0,
          ratio: 0,
          achievements: [],
          score: 0,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002")
          throw new ForbiddenException("Name already used");
      }
      throw error;
    }
  }
}
