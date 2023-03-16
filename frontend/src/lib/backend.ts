import { IUser } from "types/models";
import { api } from "./api";

export const backend = {

  //User part
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
  async patchUser(name: string, updateUser: unknown): Promise<any> {
    const response = await api.patch("/users/" + name, updateUser);
    return response.json();
  },
  async deleteAllUsers(): Promise<IUser> {
    const response = await api.delete("/users/deleteall");
    return await response.json();
  },
  async createUser(user: unknown): Promise<any> {
    const response = await api.post("/auth/Oauth", user);
    return await response.json();
  },

  //Token part
  async deleteTokenCookie(): Promise<any> {
    const response = await api.get("/auth/logout");
    return await response.json();
  },
  async getUserByToken(): Promise<any> {
    const response = await api.get("/auth/getuserbytoken");
    return await response.json();
  },
  async checkToken(): Promise<any> {
    const response = await api.get("/auth/token");
    return await response.json();
  },

  // auth with google
  async AuthWithGoogle() : Promise<any> {
    const response = await api.get("/auth/google");
    return await response.json();
  },

  //doubleauth(2FA) PART 
  async generate2FA(user : unknown): Promise<any> {
    const response = await api.post("/2FA/generate", user);
    return await response.json();
  },
  async verify2FA(user : unknown): Promise<any> {
    const response = await api.post("/2FA/verify", user);
    return await response.json();
  },
  async validate2FA(user : unknown): Promise<any> {
    const response = await api.post("/2FA/validate", user);
    return await response.json();
  },
  async disable2FA(user : unknown): Promise<any> {
    const response = await api.post("/2FA/disable", user);
    return await response.json();
  },
}
