import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { ClientChatEvents, ServerChatEvents } from "./events/chat.events";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { UseGuards, ValidationPipe } from "@nestjs/common";
import { SendMessageDto } from "./dto/chat.dto";
import { ChatService } from "./chat.service";
import { AdminGuard } from "./guards/admin.guard";

/**
 * @brief Gateway for the chat module
 * @Description Handles all the chat related events.
 * Lobby creation, joining and leaving are handled by the lobby module
 * (see {@link LobbyGateway})
 * Specific chat lobby setup is handled by the ChatLobby class
 * (see {@link ChatLobby})
 * @param prismaLobbyService
 * @param chatService
 */
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly prismaLobbyService: PrismaLobbyService,
    private readonly chatService: ChatService
  ) {}

  handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
    this.chatService.joinLobbies(client).catch((e) => {
      throw e;
    });
  }

  @SubscribeMessage(ClientChatEvents.SendMessage)
  onSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody(new ValidationPipe()) payload: SendMessageDto
  ) {
    this.chatService
      .sendMessage(payload.message, payload.lobbyId, client.data.name)
      .catch((e) => {
        throw e;
      });
  }

  @SubscribeMessage(ClientChatEvents.FetchLobbies)
  async onFetchLobbies(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobbies = await this.chatService.fetchLobbies(client.data.name);
    return {
      event: ServerChatEvents.LobbyList,
      data: lobbies,
    };
  }
  @SubscribeMessage(ClientChatEvents.FetchUsers)
  async onFetchUsers(
    @MessageBody("lobbyId") lobbyId: string) {
    const users = await this.prismaLobbyService.fetchUsersInLobby(lobbyId);
    return {
      event: ServerChatEvents.UserList,
      data: users,
    };
  }

  @SubscribeMessage(ClientChatEvents.FetchUsersExceptMe)
  async onFetchUsersExceptMe(
    @MessageBody("lobbyId") lobbyId: string,
    @MessageBody("SenderName") name: string
    ) {
    const users = await this.prismaLobbyService.fetchUsersInLobbyExceptMe(lobbyId, name);
    return {
      event: ServerChatEvents.UserListExceptMe,
      data: users,
    };
  }

  @UseGuards(AdminGuard)
  @SubscribeMessage(ClientChatEvents.BanUser)
  async onBanUser(
    @MessageBody("nameToBan") userToBan: string,
    @MessageBody("lobbyId") lobbyId: string
  ) {
    await this.chatService.banUser(userToBan, lobbyId);
    return {
      event: ServerChatEvents.UserBanned,
      data: "User banned",
    };
  }

  @UseGuards(AdminGuard)
  @SubscribeMessage(ClientChatEvents.KickUser)
  async onKickUser(
    @MessageBody("nameToKick") userToKick: string,
    @MessageBody("lobbyId") lobbyId: string
  ) {}

  @UseGuards(AdminGuard)
  @SubscribeMessage(ClientChatEvents.MuteUser)
  async onMuteUser(
    @MessageBody("nameToMute") userToMute: string,
    @MessageBody("lobbyId") lobbyId: string
  ) {}

  @UseGuards(AdminGuard)
  @SubscribeMessage(ClientChatEvents.SetAdmin)
  async onSetAdmin(
    @MessageBody("nameToSetAdmin") userToSetAdmin: string,
    @MessageBody("lobbyId") lobbyId: string
  ) {}
}
