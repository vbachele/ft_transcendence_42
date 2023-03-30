import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { LobbyModule } from "../lobby/lobby.module";
import {WebsocketModule} from "../websocket/websocket.module";
import { GameService } from "./game.service";
import {Server} from "socket.io";
import {UserModule} from '../api/users/users.module';

@Module({
  imports: [LobbyModule, WebsocketModule, UserModule],
  providers: [GameGateway, GameService, Server],
})
export class GameModule {}
