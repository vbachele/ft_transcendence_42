import {IUser} from 'types/models';
import {api} from './api';

export const backend = {
	// User
	async getAllUsers(): Promise<any> {
		const response = await api.get('/users');
		return await response.json();
	},
	async getUserByName(name: string): Promise<IUser> {
		const response = await api.get('/users/' + name);
		return await response.json();
	},
	async patchUser(name: string, updateUser: unknown): Promise<any> {
		const response = await api.patch('/users/' + name, updateUser);
		return response.json();
	},
	async deleteAllUsers(): Promise<IUser> {
		const response = await api.delete('/users/deleteall');
		return await response.json();
	},
	async createUser(user: unknown): Promise<any> {
		const response = await api.post('/auth/Oauth', user);
		return await response.json();
	},

	// Friend
	async getFriendsOf(name: string): Promise<IUser[]> {
		const response = await api.get('/friends/' + name);
		return await response.json();
	},
	async addFriend(user1: string, user2: string): Promise<IUser> {
		const response = await api.patchURL('/friends/' + user1 + '/add/' + user2);
		return await response.json();
	},
	async removeFriend(user1: string, user2: string): Promise<IUser> {
		const response = await api.delete('/friends/' + user1 + '/remove/' + user2);
		return await response.json();
	},

	// Blocked
	async getBlockedOf(name: string): Promise<IUser[]> {
		const response = await api.get('/blocked/' + name);
		return await response.json();
	},
	async blockUser(user1: string, user2: string): Promise<IUser> {
		const response = await api.patchURL(
			'/blocked/' + user1 + '/block/' + user2
		);
		return await response.json();
	},
	async unblockUser(user1: string, user2: string): Promise<IUser> {
		const response = await api.delete(
			'/blocked/' + user1 + '/unblock/' + user2
		);
		return await response.json();
	},

	// Pending
	async getPendingsOf(name: string): Promise<IUser[]> {
		const response = await api.get('/pendings/' + name);
		return await response.json();
	},
	async addPending(user1: string, user2: string): Promise<IUser> {
		const response = await api.patchURL('/pendings/' + user1 + '/add/' + user2);
		return await response.json();
	},
	async removePending(user1: string, user2: string): Promise<IUser> {
		const response = await api.delete(
			'/pendings/' + user1 + '/remove/' + user2
		);
		return await response.json();
	},

	// Token
	async deleteTokenCookie(): Promise<any> {
		const response = await api.get('/auth/logout');
		return await response.json();
	},
	async getUserByToken(): Promise<any> {
		const response = await api.get('/auth/getuserbytoken');
		return await response.json();
	},
	async checkToken(): Promise<any> {
		const response = await api.get('/auth/token');
		return await response.json();
	},

	// 2FA
	async generate2FA(user: unknown): Promise<any> {
		const response = await api.post('/2FA/sendEmail', user);
		return await response.json();
	},
	async verify2FA(user: unknown): Promise<any> {
		const response = await api.post('/2FA/verify', user);
		return await response.json();
	},
	// async validate2FA(user: unknown): Promise<any> {
	// 	const response = await api.post('/2FA/validate', user);
	// 	return await response.json();
	// },
	async disable2FA(user: unknown): Promise<any> {
		const response = await api.post('/2FA/disable', user);
		return await response.json();
	},
};
