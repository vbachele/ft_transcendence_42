import {IUser} from '../../../types/models';

export enum GameMode {
	AgainstTheClock = 'gameMode.againstTheClock',
	ScoreLimit = 'gameMode.scoreLimit',
}

export interface InvitationRequest {
	lobbyId: string;
	leftPlayer: IUser;
	rightPlayer: IUser;
}

export interface InvitationResponse extends InvitationRequest {
	state: 'accepted' | 'declined';
}
