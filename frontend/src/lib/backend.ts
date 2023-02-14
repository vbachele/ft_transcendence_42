import { IUser } from "types/models";
import { api } from "./api";

export const backend = {
  async createUser(user: IUser[]) {
    const response = await api.post("/auth/signup", user);
    return (await response.json()) as { id: string };
  },
  async getAllUsers() {
    const response = await api.get("/users/getusers");
    return (await response.json()) as { id: string };
  },
  async getOneUser(id: string) {
    const response = await api.get("/users/" + id);
    return await response.json();
  },
  async patchUser(id: string, updateUser: unknown) {
    const response = await api.patch("/users/" + id, updateUser);
    return (await response.json()) as { id: string };
  },
  async deleteAllUsers() {
    const response = await api.delete("/users/deleteall");
    return (await response.json()) as { id: string };
  },
};
