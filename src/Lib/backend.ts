import { api } from "./api"

export const backend= {
	async createUser(user:{name:string, image:string}){
		const response = await api.post("/users", user);
		return (await response.json()) as {id:string}
	},
	async updateUser(user:{name:string}, id:string){
		const response = await api.put("/users/" + id, user);
		return (await response.json()) as {id:string}
	}
}