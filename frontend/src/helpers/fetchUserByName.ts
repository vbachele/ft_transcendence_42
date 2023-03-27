import {backend} from 'lib/backend';
import {IUser} from 'types/models';

export const fetchUserByName = async (
	name: string,
	blockedOf: string
): Promise<IUser | null> => {
	try {
		const data = await backend.getUserByName(name, blockedOf);
		return data;
	} catch (error) {
		return null;
	}
};
