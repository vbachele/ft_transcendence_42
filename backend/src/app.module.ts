import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
