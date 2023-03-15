import {IUser} from 'types/models';
import compareScore from './compareScore';
import useFetchUsers from 'hooks/useFetchUsers';

function isEqual(player1: IUser, player2: IUser): boolean {
	return JSON.stringify(player1) === JSON.stringify(player2);
}

function getRanks(player: IUser) {
	const {data, isLoading, error} = useFetchUsers();

	let sorted: IUser[];
	let global: number = NaN;
	let coalition: number = NaN;

	if (data) {
		sorted = data.sort(compareScore);
		global = sorted.findIndex((p) => isEqual(p, player)) + 1;
		coalition =
			sorted
				.filter((p) => player.coalition === p.coalition)
				.findIndex((p) => isEqual(p, player)) + 1;
	}

	return {global, coalition};
}

export default getRanks;
