import { Controller, Get, Param } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { User as UserModel } from '@prisma/client'

@Controller()
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('players')
    async getUserById(@Param('id') id: number): Promise<UserModel | null> {
        return this.databaseService.user.findUnique({ where: { id: Number(id) } });
    }
}