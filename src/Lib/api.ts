
const requestConfig:RequestInit={
	headers:{
		'Content-Type': 'application/json',
		'Accept': 'application/json, text/plain',
	}
}

export const api={
	async get(url:string){
		return await fetch(import.meta.env.VITE_BACKEND_HOST + url, {...requestConfig, method:'GET'}) // veut dire qu'on spread tous les elements de request config
	},
	async post(url:string, data:unknown)
	{
		console.log(import.meta.env.VITE_BACKEND_HOST);
		return await fetch(import.meta.env.VITE_BACKEND_HOST + url, {...requestConfig, method:'POST', body:JSON.stringify(data) || "{}" }) // si la JSON.stringify(data) est vide on met un objet vide
	},
	async put(url:string, data:unknown){
		return await fetch(import.meta.env.VITE_BACKEND_HOST + url, {...requestConfig, method:'PUT', body:JSON.stringify(data) || "{}" }) // si la JSON.stringify(data) est vide on met un objet vide
	},
	async delete(url:string){
		return await fetch(import.meta.env.VITE_BACKEND_HOST + url, {...requestConfig, method:'DELETE'}) // veut dire qu'on spread tous les elements de request config
	},
}
