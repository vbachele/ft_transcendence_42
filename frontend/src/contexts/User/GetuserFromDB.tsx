import { backend } from "lib/backend";
import { Cookies } from "typescript-cookie";
import { useUserInfos } from "./userContent";
import checkUserToken from "./CheckUserToken";

const getInfosFromDB = async () => {
  const token = Cookies.get("token");
  const user = await backend.getUserByToken(token);
  return user;
};

export default getInfosFromDB;
