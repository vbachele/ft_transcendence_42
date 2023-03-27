import {PrismaLobbyService} from '../database/lobby/prismaLobby.service';
import {LobbyService} from '../lobby/lobby.service';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import { AuthenticatedSocket } from "../lobby/types/lobby.type";
import { Lobby, Lobby as LobbyModel } from "@prisma/client";
import { HttpException, HttpStatus, Injectable, Req, Res } from "@nestjs/common";
import { ServerChatEvents } from "./events/chat.events";
import {WebsocketService} from '../websocket/websocket.service';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ClientEvents } from "src/lobby/events/lobby.events";

@Injectable()
export class ChatService {
	constructor(
		private readonly prismaLobbyService: PrismaLobbyService,
		private readonly lobbyService: LobbyService,
		private readonly websocketService: WebsocketService
	) {}

	async sendMessage(content: string, lobbyId: string, username: string) {
		const lobby = this.lobbyService.getLobby(lobbyId);
		const message = await this.prismaLobbyService.pushMessage(
			lobbyId,
			content,
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
		const publicLobbies = await this.prismaLobbyService.fetchPublicLobbies();
		const privateLobbies = await this.prismaLobbyService.fetchPrivateLobbies(
			username
		);
		return publicLobbies.concat(privateLobbies);
	}

  public async banUser(userToBan: string, lobbyId: string) {
    try {
      const lobby = await this.prismaLobbyService.addToBannedList(userToBan, lobbyId);
      const bannedUser = this.websocketService.getClient(userToBan);
      if (!bannedUser) throw new WsException(`User ${userToBan} not found`);
      this.websocketService.server.to(bannedUser.id).emit(ServerChatEvents.UserBanned, {
        message: `You have been banned from lobby ${lobby.name}`,
        lobby: lobby,
      });
    }
    catch (e) {
      throw new WsException(`Error when trying to ban user: ` + e.message);
    }
  }

  // Channel Password functions

  public async checkPassword(@Req() req: Request, @Res() res: Response, chanName: string, password: string){
    try {
      const response = await this.comparePassword(chanName, password);
      res.status(200).json({response})
    }
    catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Password are not the same"
        }, HttpStatus.BAD_REQUEST);
    }
  }

  public async comparePassword( chanName: string, password: string)
  {
    const response: Lobby | null = await this.prismaLobbyService.fetchLobbbyByName(password, chanName);
    const isMatch = await bcrypt.compare(password, response?.password!);
    if (!isMatch)
    {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Password are not the same"
        }, HttpStatus.BAD_REQUEST);
    }
    return response;
  }

  public async modifyPassword(@Req() req: Request, @Res() res: Response, chanName: string, password: string) {
      const saltOrRounds = 10;
      const hashPassword = password;
      const hash = await bcrypt.hash(hashPassword , saltOrRounds);
      await this.prismaLobbyService.updatePassword(hash, chanName)
      res.status(200).json({status : "password changed"})
  }

  public async modifyDescription(@Req() req: Request, @Res() res: Response, chanName: string, description: string) {
    await this.prismaLobbyService.updateDescription(description, chanName)
    res.status(200).json({status : "description changed"})
  }
  public async kickUser(userNameToKick: string, lobbyId: string) {
    try {
      this.prismaLobbyService.deleteUserFromLobby(lobbyId, userNameToKick);
      const userToKick = this.websocketService.getClient(userNameToKick);
      if (!userToKick) return;
      // this.websocketService.server.to(userToKick.id).emit(ServerChatEvents.UserKicked, {lobbyId: lobbyId});
      this.lobbyService.leave(lobbyId, userToKick);
    }
    catch (e) {
      throw new WsException(`Error when trying to kick user: ` + e.message);
    }
  }

  public async kickFromLobby(userNameToKick: string, lobbyId: string) {
    try {
      const userToKick = this.websocketService.getClient(userNameToKick);
      if (!userToKick) return;
      this.websocketService.server
      .to(userToKick.id)
      .emit(ServerChatEvents.KickedFromLobby, {lobbyId: lobbyId});
    }
    catch (e) {
      throw new WsException(`Error when trying to kick user: ` + e.message);
    }
  }

}
