import { ALobby } from "./ALobby";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { Lobby } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { IsNumber } from "class-validator";
import {WebsocketService} from "../websocket/websocket.service";

export class ChatLobbyDto {
  @IsNumber()
  maxClients: number;
  owner: string;
}


@Injectable()
export class ChatLobby extends ALobby {

  constructor(
  data: ChatLobbyDto,
    private readonly prismaLobbyService: PrismaLobbyService,
    private readonly websocketService: WebsocketService,
  ) {
    super(websocketService.server, data.maxClients);
    this.afterInit();
  }

  afterInit() {
    const lobby: Lobby = {
      id: this.id,
      adminId: 23,
      createdAt: this.createdAt,
      maxClients: this.maxClients,
      type: 'game',
    }
    this.prismaLobbyService
      .pushLobby(lobby)
      .catch((e) => {
        console.error(e);
      });
  }

  public someRandomFunc() {
    console.log(`I'm in chat lobby!`);
  }
}
