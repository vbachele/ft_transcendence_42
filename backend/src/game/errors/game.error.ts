import {WsException} from '@nestjs/websockets';

export const enum GameErrorType {
	Forbidden = 'game.forbidden',
}

export const GameError = {
	[GameErrorType.Forbidden]: {
		status: GameErrorType.Forbidden,
		message: 'You are not allowed to perform this action',
	},
};

export class GameException extends WsException {
	constructor(error: GameErrorType, message?: string) {
		super({
			status: GameError[error].status,
			message: GameError[error].message + (message ? `: ${message}` : ''),
		});
	}
}
