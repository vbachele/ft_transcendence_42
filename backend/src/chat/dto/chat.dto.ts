import { IsString } from "class-validator";

export class SendMessageDto {
  @IsString()
  message: string;
  @IsString()
  lobbyId: string;
}
