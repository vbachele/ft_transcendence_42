import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseController } from "./database/database.controller";
import { DatabaseService } from "./database/database.service";
import { LobbyModule } from "./lobby/lobby.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./database/prisma.module";
import { UserModule } from "./api/users/users.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { FakeLoginController } from "./mocks/login/login.controller";
import { FakeLoginModule } from "./mocks/login/login.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    LobbyModule,
    AuthModule,
    UserModule,
    PrismaModule,
    CloudinaryModule,
    FakeLoginModule,
  ],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService],
})

export class AppModule {}
