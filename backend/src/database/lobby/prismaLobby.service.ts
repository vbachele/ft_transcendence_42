import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Lobby, Prisma } from "@prisma/client";

@Injectable()
export class PrismaLobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async pushLobby(lobby: Lobby): Promise<Lobby> {
    try {
      return this.prismaService.lobby.create({
        data: {
          ...lobby,
        },
      });
    } catch (e) {
      throw new Error(`Lobby database entry creation failed`);
    }
  }

  async lobbiesFromUserName(name: string) {
    try {
      return await this.prismaService.lobby.findFirst({
        where: {
          id: name,
        },
      });
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
