import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseService } from './database/database.service';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
