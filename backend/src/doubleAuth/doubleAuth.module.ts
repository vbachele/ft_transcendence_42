import { Module } from "@nestjs/common";
import { DoubleAuthController } from "./doubleAuth.controller";
import { DoubleAuthService } from "./doubleAuth.service";
import { PrismaService } from "src/database/prisma.service";
import { PrismaModule } from "src/database/prisma.module";
import { Mail2FaModule } from './mail2FA/mail2Fa.module';
import { Mail2FaController } from './mail2FA/mail2FA.controller';
import { Mail2FaGenerateService  } from "./mail2FA/Generate/mail2FAGenerate.service";

@Module({
  providers: [DoubleAuthService, PrismaService, Mail2FaGenerateService],
  imports: [PrismaModule, Mail2FaModule],
  controllers: [DoubleAuthController, Mail2FaController],
})
export class DoubleAuthModule {}
