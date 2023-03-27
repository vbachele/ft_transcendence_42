import {backend} from 'lib/backend';
import {IUser} from 'types/models';

export const fetchFriends = async (
	username: string
): Promise<IUser[] | null> => {
	try {
		const data = await backend.getFriendsOf(username);
		return data;
	} catch (error) {
		return null;
	}
};
