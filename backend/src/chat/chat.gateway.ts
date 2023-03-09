import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WsResponse,
} from "@nestjs/websockets";
import { ClientChatEvents, ServerChatEvents } from "./events/chat.events";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { ValidationPipe } from "@nestjs/common";
import { SendMessageDto } from "./dto/chat.dto";
import {ChatService} from "./chat.service";
import {WebsocketService} from "../websocket/websocket.service";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly prismaLobbyService: PrismaLobbyService, private readonly chatService: ChatService, private readonly websocketService: WebsocketService) {}

  handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
    this.chatService.joinLobbies(client).catch((e) => {throw e});
  }

  @SubscribeMessage(ClientChatEvents.SendMessage)
  onSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ValidationPipe()) payload: SendMessageDto
  ) {
    this.chatService.sendMessage(payload.message, payload.lobbyId).catch((e) => {throw e});
  }

  @SubscribeMessage(ClientChatEvents.FetchLobbies)
  async onFetchLobbies(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobbies = await this.chatService.fetchLobbies(client.data.name);
    console.log(lobbies);
    return {
      event: ServerChatEvents.LobbyList,
      data: lobbies,
    };
  }
}
