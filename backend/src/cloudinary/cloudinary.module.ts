import { Module } from "@nestjs/common";
import { CloudinaryProvider } from "./cloudinary.provider";
import { CloudinaryService } from "./cloudinary.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  imports: [PrismaModule],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
