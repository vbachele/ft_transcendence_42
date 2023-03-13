import {IUser} from 'types/models';

const isUserIn = (list: IUser[] | null, user: IUser): boolean => {
	return list?.some((listUser) => listUser.name === user.name) ?? false;
};

export default isUserIn;
