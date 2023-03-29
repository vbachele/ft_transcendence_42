import {Module} from '@nestjs/common';
import {PrismaModule} from '../database/prisma.module';
import {PrismaLobbyService} from '../database/lobby/prismaLobby.service';
import {ChatGateway} from './chat.gateway';
import {ChatService} from './chat.service';
import {LobbyModule} from '../lobby/lobby.module';
import {ChatController} from './chat.controller';
import {BlockedModule} from '../social/blocked/blocked.module';
import {PrismaLobbyModule} from '../database/lobby/prismaLobby.module';

@Module({
	imports: [PrismaModule, LobbyModule, BlockedModule, PrismaLobbyModule],
	providers: [ChatGateway, ChatService],
	controllers: [ChatController],
})
export class ChatModule {}