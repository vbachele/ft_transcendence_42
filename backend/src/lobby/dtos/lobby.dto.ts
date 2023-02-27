import { IsIn, IsEmail, IsString, Contains, IsInt } from "class-validator";
import { AuthenticatedSocket } from "src/lobby/types/server.type";
import { Socket} from 'socket.io'
import {GameLobbyDto} from "../gameLobby";
import {ChatLobbyDto} from "../chatLobby";

export type TLobbyDto = GameLobbyDto | ChatLobbyDto;


const modes = ["solo", "duo"] as const;
const types = ["game", "chat"] as const;

export class LobbyDto {
  @IsString()
  @IsIn(types)
  type: "game" | "chat";
  data: TLobbyDto;
}
