import {Global, Module} from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import {WebsocketService} from "./websocket.service";
import {LobbyModule} from "../lobby/lobby.module";

@Global()
@Module({
  imports: [LobbyModule],
  providers: [WebsocketGateway, WebsocketService],
  exports: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
