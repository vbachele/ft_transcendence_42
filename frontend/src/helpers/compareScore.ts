import {IUser} from 'types/models';

const compareScore = (a: IUser, b: IUser) => {
	return a.score > b.score
		? -1
		: a.score === b.score
		? a.wins > b.wins
			? -1
			: 1
		: 1;
};

export default compareScore;
