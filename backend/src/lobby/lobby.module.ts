import { Module } from "@nestjs/common";
import { LobbyGateway } from "./lobby.gateway";
import { LobbyService } from "./lobby.service";
import { factory } from "./lobby.creator";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";

@Module({
  providers: [LobbyGateway, LobbyService, factory, PrismaLobbyService],
  exports: [LobbyService],
})
export class LobbyModule {}
