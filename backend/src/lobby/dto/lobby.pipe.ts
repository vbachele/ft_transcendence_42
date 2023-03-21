import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';
import {LobbyDto} from './lobby.dto';
import {plainToInstance} from 'class-transformer';
import {GameLobbyDto} from '../../game/gameLobby';
import {ChatLobbyDto} from '../../chat/chatLobby';
import {validate} from 'class-validator';
import {WsException} from '@nestjs/websockets';

/**
 * @description Validate the lobby dto based on the lobby type passed in body
 */

export class LobbyValidationPipe implements PipeTransform<LobbyDto> {
  async transform(body: LobbyDto) {
    if (!body.type)
      throw new WsException(`Request is missing the [type] property`);
    if (!body.data)
      throw new WsException(`Request is missing the [data] property`)

    let obj;
    switch (body.type) {
      case "game":
        obj = plainToInstance(GameLobbyDto, body.data);
        break;
      case "chat":
        obj = plainToInstance(ChatLobbyDto, body.data);
        break;
      default:
        throw new WsException(`Invalid lobby type [${body.type}]`);
    }
    const errors = await validate(obj);
    if (errors.length > 0) {
      throw new WsException(`LobbyDto validation failed: ` + errors);
    }
    return body;
  }
}
