import { Global, Module } from "@nestjs/common";
import { PrismaLobbyService } from "./lobby/prismaLobby.service";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService, PrismaLobbyService],
  exports: [PrismaService, PrismaLobbyService],
})
export class PrismaModule {}
