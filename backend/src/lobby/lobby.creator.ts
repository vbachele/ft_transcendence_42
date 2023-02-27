import { GameLobby, GameLobbyDto } from "./gameLobby";
import { ChatLobby, ChatLobbyDto } from "./chatLobby";
import { PrismaLobbyService } from "../database/lobby/prismaLobby.service";
import { LobbyDto } from "./dtos/lobby.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";

export class LobbyValidationPipe implements PipeTransform<LobbyDto> {
  async transform(body: any, metadata: ArgumentMetadata) {
    if (!body.type)
      throw new BadRequestException(`Request is missing the [type] property`);
    let obj;
    switch (body.type) {
      case "game":
        obj = plainToInstance(GameLobbyDto, body.data);
        break;
      case "chat":
        obj = plainToInstance(ChatLobbyDto, body.data);
        break;
      default:
        throw new BadRequestException(`Invalid lobby type [${body.type}]`);
    }
    const errors = await validate(obj);
    if (errors.length > 0) {
      console.log(errors);
      throw new BadRequestException(`LobbyDto validation failed`);
    }
    return body;
  }
}

export const factory = {
  provide: "LOBBY_FACTORY",
  useFactory: (prismaLobbyService: PrismaLobbyService): any => {
    return {
      create: function (payload: LobbyDto): GameLobby | ChatLobby {
        switch (payload.type) {
          case "game": {
            return new GameLobby(payload.data as GameLobbyDto);
          }
          case "chat":
            return new ChatLobby(
              payload.data as ChatLobbyDto,
              prismaLobbyService
            );
          default:
            throw new Error(`Lobby type ${payload.type} doesn't exist`);
        }
      },
    };
  },
  inject: [PrismaLobbyService],
};
