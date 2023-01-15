import {backend} from 'lib/backend';

export const storeFirstNicknameDataBase = async () => {
	const user = await backend.createUser({
		name: 'Vincent',
		image: '',
		logged: false,
		id: '',
	});
	localStorage.setItem('id', user.id);
};

export default storeFirstNicknameDataBase;
