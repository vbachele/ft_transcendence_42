import {backend} from 'lib/backend';
import {IUser} from 'types/models';

export const fetchBlocked = async (
	username: string
): Promise<IUser[] | null> => {
	try {
		const data = await backend.getBlockedOf(username);
		return data;
	} catch (error) {
		return null;
	}
};
