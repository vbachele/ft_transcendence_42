import { ALobby } from "./ALobby";
import { Server } from "socket.io";
import {Injectable} from "@nestjs/common";
import {IsString} from "class-validator";

export class GameLobbyDto {
  @IsString()
  mode: string;
}

@Injectable()
export class GameLobby extends ALobby {
  data: GameLobbyDto;
  constructor(data: GameLobbyDto) {
    super();
    this.data = data;
    this.afterInit();
  }

  afterInit() {
    this.testFunc();
  }

  testFunc() {
    console.log(`I'm in GameLobby!`);
  }

  invitation() {
    console.log(`Sending invitation to a gameLobby`);
  }
}
