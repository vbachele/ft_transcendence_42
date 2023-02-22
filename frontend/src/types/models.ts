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
	name: string;
	description: string;
	image: string;
}
