import {IUser} from 'types/models';

const isUserIn = (list: IUser[] | null, username: string): boolean => {
	return list?.some((listUser) => listUser.name === username) ?? false;
};

export default isUserIn;
