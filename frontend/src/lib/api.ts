const requestConfig: RequestInit = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json, text/plain',
	},
};

export const api = {
	async get(url: string) {
		return await fetch('/api' + url, {...requestConfig, method: 'GET'});
	},
	async post(url: string, data: unknown) {
		return await fetch('/api' + url, {
			...requestConfig,
			method: 'POST',
			body: JSON.stringify(data) || '{}',
		});
	},
	async put(url: string, data: unknown) {
		return await fetch('/api' + url, {
			...requestConfig,
			method: 'PUT',
			body: JSON.stringify(data) || '{}',
		});
	},
	async patch(url: string, data: unknown) {
		return await fetch('/api' + url, {
			...requestConfig,
			method: 'PATCH',
			body: JSON.stringify(data) || '{}',
		});
	},
	async patchURL(url: string) {
		return await fetch('/api' + url, {...requestConfig, method: 'PATCH'});
	},
	async delete(url: string) {
		return await fetch('/api' + url, {...requestConfig, method: 'DELETE'});
	},
};
