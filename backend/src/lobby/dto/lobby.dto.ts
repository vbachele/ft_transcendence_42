import { IsIn, IsEmail, IsString, Contains, IsInt } from "class-validator";
import { AuthenticatedSocket } from "src/lobby/types/lobby.type";
import { Socket} from 'socket.io'
import {GameLobbyDto} from "../gameLobby";
import {ChatLobbyDto} from "../chatLobby";

export type TLobbyDto = GameLobbyDto | ChatLobbyDto;


const modes = ["solo", "duo"] as const;
const types = ["game", "chat"] as const;

/**
 * @member type The lobby type
 * @member data Union type used for dto validation of different lobby types
 */
export class LobbyDto {
  @IsString()
  @IsIn(types)
  type: "game" | "chat";
  data: TLobbyDto;
}

export class JoinLobbyDto {
  @IsString()
  lobbyId: string;
}

export class LeaveLobbyDto extends JoinLobbyDto {}