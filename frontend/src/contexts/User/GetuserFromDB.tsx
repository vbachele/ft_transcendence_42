import { backend } from "lib/backend";
import { Cookies } from "typescript-cookie";
import { useUserInfos } from "./userContent";

const getInfosFromDB = async () => {
  const token = Cookies.get("token");
  if (!token) return;
  const user = await backend.getUserByToken(token);
  return user;
};

export default getInfosFromDB;
