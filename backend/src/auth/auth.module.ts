import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { Oauth42Module } from "src/api/Oauth42/Oauth42.module";

@Module({
  imports: [PrismaModule, Oauth42Module],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
