import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { Prisma, PrismaPromise, User as UserModel } from "@prisma/client";

@Controller('users')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post("generate")
  async generateUsers(
    @Body() data: Prisma.UserCreateManyInput[]
  ): Promise<Prisma.BatchPayload> {
    console.info(`Table User populated with random users`);
    return await this.databaseService.user.createMany({
      data,
      skipDuplicates: true,
    });
  }

  @Delete("clear")
  async clearUsers() {
    console.info(`Deleting all user entries from database.`);
    return this.databaseService.user.deleteMany({});
  }
}
