import {ALobby} from '../lobby/ALobby';
import {PrismaLobbyService} from '../database/lobby/prismaLobby.service';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IsBooleanString, IsIn, IsNumber, IsString} from 'class-validator';
import {WebsocketService} from '../websocket/websocket.service';
import {AuthenticatedSocket} from '../lobby/types/lobby.type';
import {ConnectedSocket, WsException} from '@nestjs/websockets';
import {ServerEvents} from '../lobby/events/lobby.events';
import {ServerChatEvents} from './events/chat.events';
import * as bcrypt from 'bcrypt';


export class ChatLobbyDto {
	id?: string;
	@IsString()
	name: string;
	@IsString()
	description?: string;
	@IsNumber()
	maxClients: number;
	@IsString()
	owner: string;
	@IsString()
	@IsIn(['public', 'private'])
	privacy: string;
	@IsBooleanString()
	init: boolean;
	@IsString()
	@IsIn(['channel', 'direct_message'])
	type: string;
	password?: string;
}

export interface Lobby {
	id: string;
	name: string;
	description?: string;
	createdAt: Date;
	maxClients: number;
	type: string;
	privacy: string;
	password?: any ;
}

@Injectable()
export class ChatLobby extends ALobby {
	constructor(
		data: ChatLobbyDto,
		private readonly prismaLobbyService: PrismaLobbyService,
		private readonly websocketService: WebsocketService
	) {
		super(websocketService.server, data.maxClients);
		if (data.id) {//
			this.id = data.id;
		}
	}
	  
	/**
	 * @description Push the new lobby to the database and emit the lobby to the clients
	 * @param data Lobby data used to create the lobby
	 */
	async init(data: ChatLobbyDto) {
		if (data.init) {
			const lobby = await this.initLobby(data);
			try {
				await this.prismaLobbyService.pushLobby(lobby, data.owner);
				if (data.type === 'direct_message') {
					await this.initDirectMessage(lobby);
				}
			} catch (error) {
				throw new WsException(`Error while creating lobby: ` + error);

			}
			if (data.type === 'channel') {
				this.server.emit(ServerChatEvents.LobbyCreated, {lobby: lobby});
			}
		}
	}

	async hashPassword(password: string | undefined)
	{
		if (password){
			const saltOrRounds = 10;
			const hash  = await bcrypt.hash(password, saltOrRounds);			
			return hash;
		}
		return null;
	}
	private async initLobby(data: ChatLobbyDto): Promise<Lobby> {
		const hashPassword = await this.hashPassword(data.password)
		return {
			id: this.id,
			name: data.name,
			description: data.description,
			createdAt: this.createdAt,
			maxClients: this.maxClients,
			type: data.type,
			privacy: data.privacy,
			password: hashPassword,
		};
	}

	private async initDirectMessage(lobby: Lobby) {
		const users = lobby.name.split('+');
		const receiver = this.websocketService.getClient(users[0])!;
		const sender = this.websocketService.getClient(users[1])!;
		if (receiver)
			this.server
				.to(receiver.id)
				.emit(ServerChatEvents.LobbyCreated, {lobby: lobby});
		if (sender)
			this.server
				.to(sender.id)
				.emit(ServerChatEvents.LobbyCreated, {lobby: lobby});
		await this.prismaLobbyService.pushUserToLobby(lobby.description!, this.id);
	}

	/**
	 * @description Add a client to the lobby and push the user to the lobby in the database
	 * @param client The client to add to the lobby
	 */
	async addClient(
		@ConnectedSocket() client: AuthenticatedSocket
	): Promise<ALobby> {
		setTimeout(() => {
			super.addClient(client);
			this.prismaLobbyService
				.pushUserToLobby(client.data.name, this.id)
				.catch((e) => {
					throw e;
				});
		}, 500);
		const lobby = await this.prismaLobbyService.fetchLobbyFromId(this.id);
		this.server.to(client.id).emit(ServerEvents.AddedToLobby, {lobby: lobby});
		return this;
	}
}
