import { IUser } from "types/models";

const getRandomPlayer = async (id?: number): Promise<IUser> => {
	const response = await fetch("http://localhost:8000/players");
	const players: IUser[] = await response.json();
	const rand = Math.floor(Math.random() * players.length);

	if (id)
		return players[id - 1];
	return players[rand];
}

export default getRandomPlayer;
