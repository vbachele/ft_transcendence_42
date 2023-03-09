import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ClientChatEvents, ServerChatEvents } from './chat.events';
import { MessageDto } from './chat.dto';
import { ValidationPipe } from "@nestjs/common";
import { LobbyService } from "src/lobby/lobby.service";
import { AuthenticatedSocket } from "src/lobby/types/lobby.type";

@WebSocketGateway()
export class ChatGateway 
{
    constructor(protected readonly lobbyService: LobbyService) {}

    @SubscribeMessage(ClientChatEvents.Message)
    onMessage(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody(new ValidationPipe()) body: MessageDto
    ){
        const lobby = this.lobbyService.getLobby(body.lobbyId);
        lobby.dispatchToLobby(ServerChatEvents.Message, body.message);
    }
}