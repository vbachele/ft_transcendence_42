import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WsException,
} from '@nestjs/websockets';
import {ClientChatEvents, ServerChatEvents} from './events/chat.events';
import {PrismaLobbyService} from '../database/lobby/prismaLobby.service';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {UseGuards, ValidationPipe} from '@nestjs/common';
import {SendMessageDto} from './dto/chat.dto';
import {ChatService} from './chat.service';
import {AdminGuard} from './guards/admin.guard';
import {BlockedService} from '../social/blocked/blocked.service';//

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
		private readonly chatService: ChatService,
		private readonly blockService: BlockedService
	) {}

	handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
		this.chatService.joinLobbies(client).catch((e) => {
			throw e;
		});
	}

	@SubscribeMessage(ClientChatEvents.SendMessage)
	async onSendMessage(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody(new ValidationPipe()) payload: SendMessageDto
	) {
		try {
			const mutedList = await this.prismaLobbyService.fetchMutedInLobby(
				payload.lobbyId
			);
			if (
				mutedList &&
				mutedList.muted.find((muted) => muted.name === client.data.name)
			) {
				return;
			}
			await this.chatService.sendMessage(
				payload.message,
				payload.lobbyId,
				client.data.name
			);
		} catch (e) {
			throw new WsException(`Error sending message`);
		}
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
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string
	) {
		const userList = await this.prismaLobbyService.fetchUsersInLobby(
			client.data.name,
			lobbyId
		);

		return {
			event: ServerChatEvents.UserList,
			data: {users: userList?.users, lobbyId: lobbyId},
		};
	}

	@SubscribeMessage(ClientChatEvents.FetchUsersExceptMe)
	async onFetchUsersExceptMe(
		@MessageBody('lobbyId') lobbyId: string,
		@MessageBody('senderName') senderName: string
	) {
		const users = await this.prismaLobbyService.fetchUsersInLobbyExceptMe(
			lobbyId,
			senderName
		);
		return {
			event: ServerChatEvents.UserListExceptMe,
			data: users,
		};
	}

	@SubscribeMessage(ClientChatEvents.IsInLobby)
	async onIsInLobby(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody('lobbyId') lobbyId: string
	) {
		const isInLobby = await this.chatService.isInLobby(
			client.data.name,
			lobbyId
		);
		console.log(`is in lobby`, isInLobby);
		return {
			event: ServerChatEvents.InLobby,
			data: isInLobby,
		};
	}

	@UseGuards(AdminGuard)
	@SubscribeMessage(ClientChatEvents.KickUser)
	async onKickUser(
		@MessageBody('nameToKick') userToKick: string,
		@MessageBody('lobbyId') lobbyId: string,
		@MessageBody('type') type: 'kick' | 'ban'
	) {
		switch (type) {
			case 'ban':
				await this.chatService.banUser(userToKick, lobbyId);
				console.info(
				);
				break;
			case 'kick':
				await this.chatService.kickUser(userToKick, lobbyId);
				console.info(
				);
		}
		return {
			event: ServerChatEvents.UserBanned,
			data: 'User has been ' + type + 'ed',
		};
	}

	@UseGuards(AdminGuard)
	@SubscribeMessage(ClientChatEvents.MuteUser)
	async onMuteUser(
		@MessageBody('nameToMute') userToMute: string,
		@MessageBody('lobbyId') lobbyId: string
	) {
		await this.chatService.muteUser(userToMute, lobbyId);
		return {
			event: ServerChatEvents.UserMuted,
			data: 'User has been muted',
		};
	}

	@UseGuards(AdminGuard)
	@SubscribeMessage(ClientChatEvents.SetAdmin)
	async onSetAdmin(
		@MessageBody('nameToSetAdmin') userToSetAdmin: string,
		@MessageBody('lobbyId') lobbyId: string
	) {
		await this.prismaLobbyService.pushAdmin(userToSetAdmin, lobbyId);
		return {
			event: ServerChatEvents.UserSetAdmin,
			data: 'User has been set as admin',
		};
	}

	@UseGuards(AdminGuard)
	@SubscribeMessage(ClientChatEvents.DeleteLobby)
	async onDeleteLobby(
		@MessageBody('lobbyId') lobbyId: string
	) {
		await this.chatService.deleteLobby(lobbyId);
	}

	@SubscribeMessage(ClientChatEvents.FetchBlockedUsers)
	async onFetchBlockedUsers(
		@ConnectedSocket() client: AuthenticatedSocket
	) {
		const blockList = await this.blockService.getBlockList(client.data.name);
		return {
			event: ServerChatEvents.BlockedUsers,
			data: blockList,
		}
	}
}
