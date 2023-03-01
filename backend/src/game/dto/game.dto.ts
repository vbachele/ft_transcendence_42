import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class GameInviteDto {
	@IsString()
	lobbyId: string;

	@IsString()
	invitedClientName: string;
}

export class MovePaddleDto {
	@IsString()
	lobbyId: string;

	@IsNumber()
	x: number;
	@IsNumber()
	y: number;
}