import useFetch from 'hooks/useFetch';
import { IUser } from 'types/models';
import compareScore from './compareScore';

function isEqual(player1: IUser, player2: IUser): boolean {
	return JSON.stringify(player1) === JSON.stringify(player2);
}

function getRanks(player: IUser) {
	const { data, isLoading, error } = useFetch<IUser[]>('http://localhost:8000/players');
	let rankedPlayers: IUser[];
	let globalRank: number = NaN;
	let coalitionRank: number = NaN;

	if (data) {
		rankedPlayers = data.sort(compareScore);
		globalRank = rankedPlayers.findIndex(p => isEqual(p, player)) + 1;
		coalitionRank = rankedPlayers
										.filter(p => player.coalition === p.coalition)
										.findIndex(p => isEqual(p, player)) + 1;
	}
	return {globalRank, coalitionRank}
}

export default getRanks;
