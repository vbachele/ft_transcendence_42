import { api } from "./api"

export const backend= {
	async createUser(user:{name:string, image:string, id:string}){
		const response = await api.post("/users", user);
		return (await response.json()) as {id:string}
	},
	async updateUser(user:{name:string}, id:string){
		const response = await api.put("/users/" + id, user);
		return (await response.json()) as {id:string}
	},
	// A improve because it givs an answer
	async getUserNickName(){
		const id = localStorage.getItem("id");
		const response = await api.get("/users/" + id);
		const user = await response.json();
		const username:string= user.name
		return (username) 
	}
}