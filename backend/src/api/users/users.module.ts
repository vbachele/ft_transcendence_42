import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
