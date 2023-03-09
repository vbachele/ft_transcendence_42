import { ALobby } from "./ALobby";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { Injectable } from "@nestjs/common";
import {
  IsBoolean,
  IsBooleanString,
  IsIn,
  IsNumber,
  IsString,
} from "class-validator";
import { WebsocketService } from "../websocket/websocket.service";
import { AuthenticatedSocket } from "./types/lobby.type";
import { ConnectedSocket } from "@nestjs/websockets";

export class ChatLobbyDto {
  id?: string;
  @IsNumber()
  maxClients: number;
  @IsString()
  owner: string;
  @IsString()
  @IsIn(["public", "private"])
  privacy: string;
  @IsBooleanString()
  init: boolean;
}

export interface Lobby {
  id: string;
  createdAt: Date;
  maxClients: number;
  type: string;
  privacy: string;
}

@Injectable()
export class ChatLobby extends ALobby {
  constructor(
    data: ChatLobbyDto,
    private readonly prismaLobbyService: PrismaLobbyService,
    private readonly websocketService: WebsocketService
  ) {
    super(websocketService.server, data.maxClients);
    if (data.id) {
      this.id = data.id;
    }
    this.afterInit(data);
  }

  afterInit(data: ChatLobbyDto) {
    if (data.init) {
      console.log(`push to database`);
      const lobby: Lobby = {
        id: this.id,
        createdAt: this.createdAt,
        maxClients: this.maxClients,
        type: "chat",
        privacy: data.privacy,
      };
      this.prismaLobbyService.pushLobby(lobby, data.owner).catch((e) => {
        throw new Error(e);
      });
    }
  }

  addClient(@ConnectedSocket() client: AuthenticatedSocket): ALobby {
    setTimeout(() => {
      super.addClient(client);
      this.prismaLobbyService
        .pushUserToLobby(client.data.name, this.id)
        .catch((e) => {
          throw e;
        });
    }, 1_000);
    return this;
  }
}
