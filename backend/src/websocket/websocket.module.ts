import {Global, Module} from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import {WebsocketService} from "./websocket.service";

@Global()
@Module({
  providers: [WebsocketGateway, WebsocketService],
  exports: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
