import { backend } from "lib/backend";
import { Cookies } from "typescript-cookie";
import { useUserInfos } from "./userContent";

const getInfosFromDB = async () => {
  const token = Cookies.get("token");
  console.log(token);
  const user = await backend.getUserByToken(token);
  console.log(user);
  return user;
};

export default getInfosFromDB;
