import {backend} from 'lib/backend';
import {IUser} from 'types/models';

export const userExists = async (
	username: string,
	blockedOf: string
): Promise<boolean> => {
	try {
		const user: IUser = await backend.getUserByName(username, blockedOf);
		return Boolean(user);
	} catch (error) {
		console.error(error);
		return false;
	}
};
