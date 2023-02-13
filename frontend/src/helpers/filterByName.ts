import {IUser} from 'types/models';

function filterByName(friend: IUser, search: string): boolean {
	return friend.name
		.normalize('NFD')
		.toLowerCase()
		.includes(search.normalize('NFD').toLowerCase());
}

export default filterByName;
