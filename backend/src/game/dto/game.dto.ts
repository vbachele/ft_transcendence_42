import {IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class GameInviteDto {
	@IsString()
	lobbyId: string;

	@IsString()
	invitedClientName: string;
}

export class FetchSetupDto {
	@IsString()
	lobbyId: string;
}

const Direction = ["up", "down"];

export class MovePaddleDto {
	@IsString()
	lobbyId: string;

	@IsString()
	// @IsIn(Direction)
	direction: string;
}