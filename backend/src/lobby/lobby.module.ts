import { Module } from "@nestjs/common";
import { LobbyGateway } from "./lobby.gateway";
import { LobbyService } from "./lobby.service";
import {PrismaLobbyService} from "../database/lobby/prismaLobby.service";

@Module({
  providers: [LobbyGateway, LobbyService, PrismaLobbyService]
})
export class LobbyModule {}
