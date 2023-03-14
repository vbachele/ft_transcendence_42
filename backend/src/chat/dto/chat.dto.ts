import {IsIn, IsString} from "class-validator";

export class SendMessageDto {
  @IsString()
  message: string;
  @IsString()
  lobbyId: string;

}
