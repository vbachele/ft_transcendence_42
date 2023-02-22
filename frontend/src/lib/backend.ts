import { IUser } from "types/models";
import { api } from "./api";

export const backend = {
  async getAllUsers(): Promise<any> {
    const response = await api.get("/users");
    return await response.json();
  },
  async getOneUser(id: string): Promise<any> {
    const response = await api.get("/users/" + id);
    return await response.json();
  },
  async getUserByName(name: string): Promise<IUser> {
    const response = await api.get("/users/" + name);
    return await response.json();
  },
  async patchUser(name: string, updateUser: unknown): Promise<IUser> {
    const response = await api.patch("/users/" + name, updateUser);
    return response.json();
  },
  async deleteAllUsers(): Promise<IUser> {
    const response = await api.delete("/users/deleteall");
    return await response.json();
  },
  async createUser(user: unknown): Promise<IUser> {
    const response = await api.post("/auth/Oauth", user);
    return await response.json();
  },
  async deleteTokenCookie(): Promise<any> {
    const response = await api.get("/auth/logout");
    return await response.json();
  },
  async getUserByToken(
    token:
      | string
      | {
          [property: string]: string;
        }
      | undefined
  ): Promise<any> {
    const response = await api.get("/users/token" + token);
    return await response.json();
  },
};
