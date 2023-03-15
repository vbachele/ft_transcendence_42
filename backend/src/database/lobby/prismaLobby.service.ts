import {BadRequestException, HttpException, Injectable} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Lobby as LobbyModel, Prisma } from "@prisma/client";
import { Lobby } from "../../lobby/chatLobby";
import { Message as MessageModel } from "@prisma/client";

@Injectable()
export class PrismaLobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async pushLobby(lobby: Lobby, owner: string): Promise<LobbyModel> {
    try {
      const admin = await this.prismaService.user.findFirst({
        where: {
          name: owner,
        },
      });
      return this.prismaService.lobby.create({
        data: {
          ...lobby,
          adminId: admin!.id,
        },
      });
    } catch (e) {
      throw new Error(`Lobby database entry creation failed: ${e}`);
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
        include: { users: true },
        data: {
          users: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    } catch (e) {
      throw new Error(`Can't add user database entry for the lobby: ${e}`);
    }
  }

  async pushMessage(lobbyId: string, message: string, username: string): Promise<{messages: MessageModel[]}> {
    try {
      return this.prismaService.lobby.update({
        where: {
          id: lobbyId,
        },
        data: {
          messages: {
            createMany: {
                data: [{ content: message, authorName: username}],
            }
          }
        },
        select: {
            messages: true,
        }
      });
    } catch (e) {
      throw new Error(`Lobby database entry creation failed ${e}`);
    }
  }

  async lobbiesFromUserName(
    name: string
  ): Promise<{ lobbies: LobbyModel[] } | null> {
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
      throw new Error(`User ${name} not found`);
    }
  }

  async fetchPublicLobbies(): Promise<LobbyModel[]> {
    return this.prismaService.lobby.findMany({
      where: {
        privacy: "public",
      },
      include: {
        messages: true,
      }
    });
  }

  async fetchPrivateLobbies(username: string): Promise<LobbyModel[]> {
    return this.prismaService.lobby.findMany({
      where: {
        privacy: "private",
        users: {
          some: { name: username },
        },
      },
      include: {
        messages: true,
      }
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
        }
    });
  }

  deleteLobby(id: string): Promise<LobbyModel> {
    return this.prismaService.lobby.delete({
      where: {
        id: id,
      },
    });
  }
}
