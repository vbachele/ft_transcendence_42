import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { LobbyModule } from "../lobby/lobby.module";
import {WebsocketModule} from "../websocket/websocket.module";
import { GameService } from "./game.service";
import {Server} from "socket.io";

@Module({
  imports: [LobbyModule, WebsocketModule],
  providers: [GameGateway, GameService, Server],
})
export class GameModule {}
