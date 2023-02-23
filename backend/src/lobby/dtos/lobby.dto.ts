import { IsIn, IsEmail, IsString, Contains, IsInt } from "class-validator";
import { AuthenticatedSocket } from "src/lobby/types/server.type";
import { Socket} from 'socket.io'

const modes = ["solo", "duo"] as const;
const types = ["game", "chat"] as const;

export class LobbyCreateDto {
  @IsString()
  @IsIn(modes)
  mode: string;
  @IsString()
  @IsIn(types)
  type: string;
}

export class LobbyJoinDto {
  @IsString()
  lobbyId: string;
}

export class LobbyInviteDto {
  @IsInt()
  invitedClient: string;
}