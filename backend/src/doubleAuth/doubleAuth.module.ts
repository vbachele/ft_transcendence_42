import { Module } from "@nestjs/common";
import { PrismaModule } from "src/database/prisma.module";
import { DoubleAuthController } from "./doubleAuth.controller";
import { DoubleAuthService } from "./doubleAuth.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
  providers: [DoubleAuthService, PrismaService],
  imports: [PrismaModule],
  controllers: [DoubleAuthController],
})
export class DoubleAuthModule {}
