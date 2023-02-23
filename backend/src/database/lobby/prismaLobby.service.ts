import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Lobby, Prisma } from "@prisma/client";

@Injectable()
export class PrismaLobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async pushLobby(lobby: Lobby, owner: string): Promise<Lobby> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          name: owner,
        },
      });
      return this.prismaService.lobby.create({
        data: {
          ...lobby,
          adminId: user?.id as number,
          clients: {connect: {id: user?.id}},
        },
      });
    } catch (e) {
      throw new Error(`Couldn't find user [${owner}`);
    }
  }

  async lobbiesFromUserName(name: string): Promise<Lobby[] | undefined> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          name: name,
        },
        include: {
          lobbies: true,
        },
      });
      return user?.lobbies;
    } catch (error) {
      console.error(error);
    }
  }

  deleteLobby(id: string): Promise<Lobby> {
    return this.prismaService.lobby.delete({
      where: {
        id: id,
      },
    });
  }

  async clearLobbies(): Promise<Prisma.BatchPayload> {
    return this.prismaService.lobby.deleteMany({});
  }
}
