import { IsIn, IsEmail, IsString, Contains, IsInt } from "class-validator";
import { AuthenticatedSocket } from "src/game/types/server.type";
import { Socket} from 'socket.io'

const modes = ["solo", "duo"] as const;

export class LobbyCreateDto {
  @IsString()
  @IsIn(modes)
  mode: string;
}

export class LobbyJoinDto {
  @IsString()
  lobbyId: string;
}

export class LobbyInviteDto {
  @IsInt()
  invitedClient: string;
}