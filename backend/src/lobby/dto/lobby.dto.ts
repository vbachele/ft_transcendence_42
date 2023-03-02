import {IsIn, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import { GameLobbyDto } from "../gameLobby";
import { ChatLobbyDto } from "../chatLobby";
import {Injectable} from "@nestjs/common";
import {Type} from "class-transformer";

export type TLobbyDto = GameLobbyDto | ChatLobbyDto;

const modes = ["solo", "duo"] as const;
const types = ["game", "chat"] as const;

/**
 * @member type The lobby type
 * @member data Union type used for dto validation of different lobby types
 */

@Injectable()
export class LobbyDto {
  @IsString()
  @IsIn(types)
  type: "game" | "chat";

  @IsNotEmpty()
  data: TLobbyDto;
}

export class JoinLobbyDto {
  @IsString()
  lobbyId: string;
}

export class LeaveLobbyDto extends JoinLobbyDto {}