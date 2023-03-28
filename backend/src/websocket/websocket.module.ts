import {Global, Module} from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import {WebsocketService} from "./websocket.service";
import {LobbyModule} from "../lobby/lobby.module";
import {BlockedModule} from '../social/blocked/blocked.module';
import {PrismaModule} from '../database/prisma.module';
import {BlockedService} from '../social/blocked/blocked.service';

@Global()
@Module({
  imports: [LobbyModule, PrismaModule],
  providers: [WebsocketGateway, WebsocketService, BlockedService],
  exports: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
