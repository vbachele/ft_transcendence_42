import {IsIn, IsString} from "class-validator";

export class SendMessageDto {
  @IsString()
  message: string;
  @IsString()
  lobbyId: string;
}

export class FetchUsersDto {
  @IsString()
  lobbyId: string;
  @IsString()
  senderName: string;
}
