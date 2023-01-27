import { IsIn, IsEmail, IsString, Contains } from "class-validator";

const modes = ["solo", "duo"] as const;

export class LobbyCreateDto {
  @IsString()
  @IsIn(modes)
  mode: string;
}
