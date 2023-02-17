import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { SessionStoreService } from './websocket.service';

@Module({
  providers: [WebsocketGateway, SessionStoreService],
})
export class WebsocketModule {}
