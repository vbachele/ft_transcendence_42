import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform, ValidationPipe,
} from "@nestjs/common";
import { LobbyDto } from "./lobby.dto";
import { plainToInstance } from "class-transformer";
import { GameLobbyDto } from "../gameLobby";
import { ChatLobbyDto } from "../chatLobby";
import { validate } from "class-validator";
import {MessageBody} from "@nestjs/websockets";

/**
 * @description Validate the lobby dto based on the lobby type passed in body
 */

export class LobbyValidationPipe implements PipeTransform<LobbyDto> {
  async transform(body: LobbyDto, metadata: ArgumentMetadata) {
    if (!body.type)
      throw new BadRequestException(`Request is missing the [type] property`);
    console.log(`in lobby validation pipe`, body)
    if (!body.data)
      throw new BadRequestException(`Request is missing the [data] property`)

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
