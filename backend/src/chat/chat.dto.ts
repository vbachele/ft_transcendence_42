import { IsNumber, IsString, MaxLength, maxLength } from "class-validator";

export class MessageDto {
    @IsString()
    @MaxLength(5000)
    message: string

    @IsString()
    lobbyId: string
}