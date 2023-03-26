export interface IUser {
	name: string;
	image: string;
	coalition: string;
	status: string;
	score: number;
	games: number;
	wins: number;
	ratio: number;
	achievements: string[];
}

export interface IAchievement {
	id: number;
	api: string;
	name: string;
	description: string;
	image: string;
}

export interface INotification {
	id: number;
	message: string;
	sender: string;
	createdAt: Date;
	type:
		| 'ACHIEVEMENT'
		| 'FRIEND_REQUEST'
		| 'FRIEND_ACCEPT'
		| 'FRIEND_DENY'
		| 'REMOVE'
		| 'BLOCKED'
		| 'MESSAGE'
		| 'BANNED'
		| 'KICKED'
		| 'ADMIN';
}

export type TCallback = ({}) => void;

export interface ILobbyData {
	id: string;
	type: string;
}
