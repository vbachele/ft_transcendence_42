import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseController } from "./database/database.controller";
import { DatabaseService } from "./database/database.service";
import { GameModule } from "./game/game.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./api/users/users.module";
import { CloudinaryModule } from "./utils/cloudinary.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GameModule,
    AuthModule,
    UserModule,
    PrismaModule,
    CloudinaryModule,
  ],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
