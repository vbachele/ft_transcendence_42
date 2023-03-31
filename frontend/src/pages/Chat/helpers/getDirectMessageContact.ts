import {IUser} from 'types/models';

export function getDirectMessageContact(
	users: IUser[],
	currentUsername: string
): IUser {
	if (users[0].name === currentUsername) return users[1];
	else return users[0];
}
