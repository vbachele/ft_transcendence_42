import {Module} from "@nestjs/common";
import {PrismaModule} from "../database/prisma.module";
import {PrismaLobbyService} from "../database/lobby/prismaLobby.service";
import {ChatGateway} from "./chat.gateway";
import {ChatService} from "./chat.service";
import {LobbyService} from "../lobby/lobby.service";
import {LobbyModule} from "../lobby/lobby.module";

@Module({
	imports: [PrismaModule, LobbyModule],
	providers: [PrismaLobbyService, ChatGateway, ChatService],
})

export class ChatModule {}