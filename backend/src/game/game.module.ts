import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { LobbyModule } from "../lobby/lobby.module";

@Module({
  imports: [LobbyModule],
  providers: [GameGateway],
})
export class GameModule {}
