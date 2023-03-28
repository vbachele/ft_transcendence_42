import {WsException} from '@nestjs/websockets';

export const enum ErrorType {
	Forbidden = 'Forbidden',
	LobbyAlreadyExist = 'LobbyAlreadyExist',
	LobbyNotFound = 'LobbyNotFound',
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
	},
	[ErrorType.LobbyNotFound]: {
		status: 'bad_request',
		message: 'Lobby not found',
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
