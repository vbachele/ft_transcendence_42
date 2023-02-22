import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getInfosFromDB from "./GetuserFromDB";
import { userInfo } from "os";

type UserContextProviderProps = {
  children: React.ReactNode;
};

export type Achievements = {
  achievements: number;
};

export type UserName = {
  userName: string;
};

export type AuthImage = {
  image: string;
};

type UserContextType = {
  userName: UserName;
  setUserName: React.Dispatch<React.SetStateAction<UserName>>;
  image: AuthImage;
  setImage: React.Dispatch<React.SetStateAction<AuthImage>>;
  achievements: Achievements;
  setAchievements: React.Dispatch<React.SetStateAction<Achievements>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userName, setUserName] = useState<UserName>({ userName: "" });
  const [image, setImage] = useState<AuthImage>({ image: "" });
  const [achievements, setAchievements] = useState<Achievements>({
    achievements: 0,
  });
  useEffect(() => {
    const userInfos = getInfosFromDB();
    userInfos.then((res) => {
      console.log(res);
      setUserName({ userName: res.name });
      setImage({ image: res.image });
      setAchievements({ achievements: res.achievements });
    });
  }, []);
  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        image,
        setImage,
        achievements,
        setAchievements,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserInfos() {
  return useContext(UserContext);
}

export default UserContext;
