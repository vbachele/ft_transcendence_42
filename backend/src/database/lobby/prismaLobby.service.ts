import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {
	Lobby as LobbyModel,
	Message as MessageModel,
	User as UserModel,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {PrismaService} from 'src/database/prisma.service';
import {Lobby} from '../../chat/chatLobby';
import {WsException} from '@nestjs/websockets';

@Injectable()
export class PrismaLobbyService {
	constructor(private readonly prismaService: PrismaService) {}

	async pushLobby(lobby: Lobby, owner: string) {
		try {
			console.log(`owner is `, owner);
			const channel = await this.prismaService.lobby.create({
				data: {
					...lobby,
					admins: {
						connect: {
							name: owner,
						},
					},
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Problem to create channel',
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async pushUserToLobby(
		username: string,
		lobbyId: string
	): Promise<LobbyModel | null> {
		try {
			const user = await this.prismaService.user.findFirst({
				where: {
					name: username,
				},
			});
			return await this.prismaService.lobby.update({
				where: {
					id: lobbyId,
				},
				include: {users: true},
				data: {
					users: {
						connect: {
							id: user?.id,
						},
					},
				},
			});
		} catch (e) {
			throw new WsException(`Can't add user database entry for the lobby`);
		}
	}

	async pushMute(username: string, lobbyId: string) {
		try {
			return await this.prismaService.lobby.update({
				where: {
					id: lobbyId,
				},
				include: {muted: true},
				data: {
					muted: {
						connect: {
							name: username,
						},
					},
				},
			});
		} catch (e) {
			throw new WsException(`Can't add mute database entry for the lobby`);
		}
	}

	async pushAdmin(
		username: string,
		lobbyId: string
	): Promise<LobbyModel | null> {
		console.log(`pushing admin ${username} to lobby ${lobbyId}`);
		try {
			return await this.prismaService.lobby.update({
				where: {
					id: lobbyId,
				},
				include: {admins: true},
				data: {
					admins: {
						connect: {
							name: username,
						},
					},
				},
			});
		} catch (e) {
			throw new WsException(`Can't add admin database entry for the lobby`);
		}
	}

	async pushMessage(
		lobbyId: string,
		message: string,
		username: string
	): Promise<{messages: MessageModel[]}> {
		try {
			return this.prismaService.lobby.update({
				where: {
					id: lobbyId,
				},
				data: {
					messages: {
						createMany: {
							data: [{content: message, authorName: username}],
						},
					},
				},
				select: {
					messages: true,
				},
			});
		} catch (e) {
			throw new WsException(`Lobby database entry creation failed`);
		}
	}

	async lobbiesFromUserName(
		name: string
	): Promise<{lobbies: LobbyModel[]} | null> {
		try {
			return await this.prismaService.user.findUnique({
				where: {
					name: name,
				},
				select: {
					lobbies: true,
				},
			});
		} catch (error) {
			throw new WsException(`User ${name} not found`);
		}
	}

	async fetchChannels(username: string): Promise<LobbyModel[]> {
		return this.prismaService.lobby.findMany({
			where: {
				type: 'channel',
				NOT: {
					banned: {
						some: {name: username},
					},
				},
			},
			include: {
				messages: true,
			},
		});
	}

	async fetchDirectMessages(username: string): Promise<LobbyModel[]> {
		return this.prismaService.lobby.findMany({
			where: {
				type: 'direct_message',
				users: {
					some: {name: username},
				},
			},
			include: {
				messages: true,
			},
		});
	}

	async fetchLobbies(): Promise<LobbyModel[]> {
		return this.prismaService.lobby.findMany();
	}

	async fetchLobbyFromId(lobbyId: string): Promise<LobbyModel | null> {
		return this.prismaService.lobby.findUnique({
			where: {
				id: lobbyId,
			},
			include: {
				messages: true,
			},
		});
	}

	async fetchUserInLobby(
		username: string,
		lobbyId: string
	): Promise<{users: UserModel[]} | null> {
		return this.prismaService.lobby.findUnique({
			where: {
				id: lobbyId,
			},
			select: {
				users: {
					where: {
						name: username,
					},
				},
			},
		});
	}

	async fetchUsersInLobby(lobbyId: string) {
		return this.prismaService.lobby.findUnique({
			where: {
				id: lobbyId,
			},
			select: {
				users: true,
			},
		});
	}

	async fetchUsersInLobbyExceptMe(
		lobbyId: string,
		currentUserName: string
	): Promise<any> {
		const lobby = await this.prismaService.lobby.findUnique({
			where: {
				id: lobbyId,
			},
			select: {
				users: true,
			},
		});

		const filteredUsers = lobby?.users.filter(
			(user: any) => user.name !== currentUserName
		);
		return {...lobby, users: filteredUsers};
	}

	async fetchAdminsInLobby(lobbyId: string) {
		return this.prismaService.lobby.findUnique({
			where: {
				id: lobbyId,
			},
			select: {
				admins: true,
			},
		});
	}

	fetchMutedInLobby(lobbyId: string) {
		return this.prismaService.lobby.findUnique({
			where: {
				id: lobbyId,
			},
			select: {
				muted: true,
			},
		});
	}

	/* Password Channel Part */
	async fetchLobbyByName(password: string, chanName: string) {
		try {
			return await this.prismaService.lobby.findFirst({
				where: {
					name: chanName,
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: "Channel doesn't exist",
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async updatePassword(hashPassword: string, chanName: string) {
		try {
			await this.prismaService.lobby.update({
				where: {
					name: chanName,
				},
				data: {
					password: hashPassword,
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Error to update channel password for ${chanName}`,
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async updateDescription(description: string, chanName: string) {
		try {
			await this.prismaService.lobby.update({
				where: {
					name: chanName,
				},
				data: {
					description: description,
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `Error to update description for ${chanName}`,
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async addToBannedList(username: string, lobbyId: string) {
		return this.prismaService.lobby.update({
			where: {
				id: lobbyId,
			},
			data: {
				banned: {
					connect: {
						name: username,
					},
				},
			},
			include: {
				users: true,
			}
		});
	}

	async deleteLobby(id: string): Promise<LobbyModel> {
		return this.prismaService.lobby.delete({
			where: {
				id: id,
			},
		});
	}

	async deleteUserFromLobby(lobbyId: string, userToDelete: string) {
		return this.prismaService.lobby.update({
			where: {
				id: lobbyId,
			},
			data: {
				users: {
					disconnect: [{name: userToDelete}],
				},
			},
			include: {
				users: true,
			}
		});
	}
}
