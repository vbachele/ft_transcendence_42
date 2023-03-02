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
	id: number;
}

export interface IAchievement {
	id: number;
	api: string;
	name: string;
	description: string;
	image: string;
}

export type TCallback = ({}) => void;

export interface ILobbyData {
  id: string;
  type: string;
}
