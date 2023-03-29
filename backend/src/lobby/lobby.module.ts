import { Module } from "@nestjs/common";
import { LobbyGateway } from "./lobby.gateway";
import { LobbyService } from "./lobby.service";
import { factory } from "./lobby.creator";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import {PrismaLobbyModule} from '../database/lobby/prismaLobby.module';

@Module({
  imports: [PrismaLobbyModule],
  providers: [LobbyGateway, LobbyService, factory],
  exports: [LobbyService],
})
export class LobbyModule {}
