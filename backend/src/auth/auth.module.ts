import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/database/prisma.module";
import { Oauth42Module } from "src/api/Oauth42/Oauth42.module";
import { UserModule } from "src/api/users/users.module";
import { UserService } from "src/api/users/users.service";
import { GoogleStrategy } from "./google-auth/googleStrategy";
import { sessionSerializer } from "./google-auth/serializer";

@Module({
  imports: [PrismaModule, Oauth42Module, UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, GoogleStrategy, sessionSerializer],
})
export class AuthModule {}
