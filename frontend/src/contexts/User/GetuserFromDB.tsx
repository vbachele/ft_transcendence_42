import { backend } from "lib/backend";
import { Cookies } from "typescript-cookie";
import { useUserInfos } from "./userContent";

const getInfosFromDB = async () => {
  const user = await backend.getUserByToken();
  return user;
};

export default getInfosFromDB;
