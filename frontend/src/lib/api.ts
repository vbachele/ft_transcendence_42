const requestConfig: RequestInit = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json, text/plain',
	},
};

export const api = {
	async get(url: string) {
		return await fetch(url, {...requestConfig, method: 'GET'});
	},
	async getFilterBlocked(url: string, blockedOf: string) {
		return await fetch(url + '?blockedOf=' + blockedOf, {
			...requestConfig,
			method: 'GET',
		});
	},
	async post(url: string, data: unknown) {
		return await fetch(url, {
			...requestConfig,
			method: 'POST',
			body: JSON.stringify(data) || '{}',
		});
	},
	async put(url: string, data: unknown) {
		return await fetch(url, {
			...requestConfig,
			method: 'PUT',
			body: JSON.stringify(data) || '{}',
		});
	},
	async patch(url: string, data: unknown) {
		return await fetch(url, {
			...requestConfig,
			method: 'PATCH',
			body: JSON.stringify(data) || '{}',
		});
	},
	async patchURL(url: string) {
		return await fetch(url, {...requestConfig, method: 'PATCH'});
	},
	async delete(url: string) {
		return await fetch(url, {...requestConfig, method: 'DELETE'});
	},
};
