import {IUser} from 'types/models';
import {api} from './api';

export const backend = {
	async createUser(user: IUser[]) {
		const response = await api.post('/auth/signup', user);
		return (await response.json()) as {id: string};
	},
	async getAllUsers(): Promise<IUser[]> {
		const response = await api.get('/users');
		return await response.json();
	},
	async getOneUser(id: string) {
		const response = await api.get('/users/' + id);
		return (await response.json()) as {id: string};
	},
	async getUserByName(name: string) {
		const response = await api.get('/users/' + name);
		return await response.json();
	},
	async patchUser(id: string, updateUser: unknown) {
		const response = await api.patch('/users/' + id, updateUser);
		return (await response.json()) as {id: string};
	},
	async deleteAllUsers() {
		const response = await api.delete('/users/deleteall');
		return (await response.json()) as {id: string};
	},
	async getAllAchievements() {
		const response = await api.get('/achievements');
		return await response.json();
	},
};
