import {forwardRef, Global, Module} from '@nestjs/common';
import {PrismaLobbyService} from './prismaLobby.service';
import {BlockedService} from '../../social/blocked/blocked.service';
import {BlockedModule} from '../../social/blocked/blocked.module';
import {PrismaModule} from '../prisma.module';
import {ChatModule} from '../../chat/chat.module';
import {WebsocketModule} from '../../websocket/websocket.module';

@Global()
@Module({
	imports: [BlockedModule, PrismaModule],
	providers: [PrismaLobbyService],
	exports: [PrismaLobbyService],
})
export class PrismaLobbyModule {}
