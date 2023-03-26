import {WsException} from '@nestjs/websockets';

export const enum ErrorType {
	Forbidden = 'Forbidden',
	LobbyAlreadyExist = 'LobbyAlreadyExist',
	InvalidPassword = 'InvalidPassword',
}

export const LobbyError = {
	[ErrorType.Forbidden]: {
		status: 'forbidden',
		message: 'You are not allowed to perform this action',
	},
	[ErrorType.LobbyAlreadyExist]: {
		status: 'forbidden',
		message: 'Lobby already exist',
	},
	[ErrorType.InvalidPassword]: {
		status: 'forbidden',
		message: 'Invalid password',
	}
};

export class LobbyException extends WsException {
	constructor(error: ErrorType, message?: string) {
		super({
			status: LobbyError[error].status,
			message: LobbyError[error].message + (message ? `: ${message}` : ''),
		});
	}
}
