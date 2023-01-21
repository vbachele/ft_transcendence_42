import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { User as UserModel } from '@prisma/client'

@Controller()
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('players')
    async getUserById(@Param('id') id: number): Promise<UserModel | null> {
        return this.databaseService.user.findUnique({ where: { id: Number(id) } });
    }

    @Post('create_user')
    async createUser(
        @Body() userData: UserModel 
    ): Promise<UserModel> {
        console.log(`Creating user: [${userData}]`);
        return this.databaseService.user.create({
            data: userData
        })
    }
}