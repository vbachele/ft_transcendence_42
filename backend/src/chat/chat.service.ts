import {PrismaLobbyService} from '../database/lobby/prismaLobby.service';
import {LobbyService} from '../lobby/lobby.service';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {Lobby, Lobby as LobbyModel} from '@prisma/client';
import {HttpException, HttpStatus, Injectable, Req, Res} from '@nestjs/common';
import {ServerChatEvents} from './events/chat.events';
import {WebsocketService} from '../websocket/websocket.service';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import {ClientEvents} from 'src/lobby/events/lobby.events';
import {BlockedService} from '../social/blocked/blocked.service';

@Injectable()
export class ChatService {
	constructor(
		private readonly prismaLobbyService: PrismaLobbyService,
		private readonly lobbyService: LobbyService,
		private readonly websocketService: WebsocketService,
		private readonly blockService: BlockedService
	) {}

	async sendMessage(content: string, lobbyId: string, username: string) {
		const lobby = this.lobbyService.getLobby(lobbyId);
		const message = await this.prismaLobbyService.pushMessage(
			lobbyId,
			content.substring(0, 4096),
			username
		);
		lobby.dispatchToLobby(ServerChatEvents.IncomingMessage, {
			message: message.messages[message.messages.length - 1],
		});
		console.info(`Message sent - [${message}] - to lobby [${lobbyId}]`);
	}

	/**
	 * @Description When client reconnects, rejoin all the lobbies he was in
	 * @param client - the client that reconnected
	 */
	public async joinLobbies(@ConnectedSocket() client: AuthenticatedSocket) {
		const lobbies = await this.prismaLobbyService.lobbiesFromUserName(
			client.data.name
		);
		lobbies?.lobbies.forEach((lobbyModel) => {
			const lobby = this.lobbyService.getLobby(lobbyModel.id);
			lobby.addClient(client);
		});
	}

	/**
	 * @Description Fetch all the lobbies the user is in
	 * @param username - the username of the user
	 */
	public async fetchLobbies(username: string): Promise<LobbyModel[]> {
		const channels = await this.prismaLobbyService.fetchChannels(username);
		const directMessages = await this.prismaLobbyService.fetchDirectMessages(
			username
		);

		return channels.concat(directMessages);
	}

	public async isInLobby(username: string, lobbyId: string): Promise<boolean> {
		try {
			const user = await this.prismaLobbyService.fetchUserInLobby(
				username,
				lobbyId
			);
			return user?.users.length === 1;
		} catch (e) {
			throw new WsException(`Error when trying to fetch user: ` + e.message);
		}
	}

	// Channel Password functions

	public async checkPassword(
		@Req() req: Request,
		@Res() res: Response,
		chanName: string,
		password: string
	) {
		try {
			const response = await this.comparePassword(chanName, password);
			res.status(200).json({response});
		} catch {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Password are not the same',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	public async comparePassword(chanName: string, password: string) {
		const response: Lobby | null =
			await this.prismaLobbyService.fetchLobbyByName(chanName);
		const isMatch = await bcrypt.compare(password, response?.password!);
		if (!isMatch) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Password are not the same',
				},
				HttpStatus.BAD_REQUEST
			);
		}
		return response;
	}

	public async modifyPassword(
		@Req() req: Request,
		@Res() res: Response,
		chanName: string,
		password: string
	) {
		const saltOrRounds = 10;
		const hashPassword = password;
		const hash = await bcrypt.hash(hashPassword, saltOrRounds);
		await this.prismaLobbyService.updatePassword(hash, chanName);
		res.status(200).json({status: 'password changed'});
	}

	public async modifyDescription(
		@Req() req: Request,
		@Res() res: Response,
		chanName: string,
		description: string
	) {
		await this.prismaLobbyService.updateDescription(description, chanName);
		res.status(200).json({status: 'description changed'});
	}
	public async kickUser(userNameToKick: string, lobbyId: string) {
		try {
			const lobby = await this.prismaLobbyService.deleteUserFromLobby(
				lobbyId,
				userNameToKick
			);
			const userToKick = this.websocketService.getClient(userNameToKick);
			if (!userToKick) return;
			this.lobbyService.leave(lobbyId, userToKick);
			this.websocketService.server
				.to(userToKick.id)
				.emit(ServerChatEvents.KickedFromLobby, {lobbyId: lobbyId});
			this.websocketService.server.emit(ServerChatEvents.UserList, {
				users: lobby.users,
				lobbyId: lobbyId,
			});
			`User - [${userToKick}] - has been kicked from the lobby - [${lobbyId}]`;
		} catch (e) {
			throw new WsException(`Error when trying to kick user: ` + e.message);
		}
	}

	public async muteUser(userNameToMute: string, lobbyId: string) {
		try {
			await this.prismaLobbyService.pushMute(userNameToMute, lobbyId);
			const userToMute = this.websocketService.getClient(userNameToMute);
			if (!userToMute) return;
			this.websocketService.server
				.to(userToMute.id)
				.emit(ServerChatEvents.MutedFromLobby, {lobbyId: lobbyId});
		} catch (e) {
			throw new WsException(`Error when trying to mute user: ` + e.message);
		}
	}

	public async banUser(userToBan: string, lobbyId: string) {
		try {
			const lobby = await this.prismaLobbyService.addToBannedList(
				userToBan,
				lobbyId
			);
			const bannedUser = this.websocketService.getClient(userToBan);
			if (!bannedUser) return;
			this.websocketService.server
				.to(bannedUser.id)
				.emit(ServerChatEvents.KickedFromLobby, {lobbyId: lobbyId});
			const lobbyList = await this.fetchLobbies(userToBan);
			this.websocketService.server
				.to(bannedUser.id)
				.emit(ServerChatEvents.LobbyList, lobbyList);
			this.websocketService.server.emit(ServerChatEvents.UserList, {
				users: lobby.users,
				lobbyId: lobbyId,
			});
			`User - [${userToBan}] - has been banned from the lobby - [${lobbyId}]`;
		} catch (e) {
			throw new WsException(`Error when trying to ban user: ` + e.message);
		}
	}

	public async deleteLobby(lobbyId: string) {
		try {
			await this.prismaLobbyService.deleteLobby(lobbyId);
			this.lobbyService.delete(lobbyId);
			this.websocketService.server.emit(ServerChatEvents.LobbyDeleted, {
				lobbyId: lobbyId,
			});
		} catch (e) {
			throw new WsException(`Error when trying to delete lobby: ` + e.message);
		}
	}
}
