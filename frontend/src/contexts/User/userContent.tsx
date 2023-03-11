import {createContext, useContext, useEffect, useState} from 'react';
import getInfosFromDB from './GetuserFromDB';
import {createContext, useContext, useEffect, useState} from 'react';
import getInfosFromDB from './GetuserFromDB';
import {Achievements} from 'pages/Dashboard/components/Achievements/Achievements.styles';

type UserContextProviderProps = {
	children: React.ReactNode;
};

export type DoubleAuthVerified = {
	verified2FA: boolean;
};

export type DoubleAuth = {
	doubleAuth: boolean;
};

export type Coalition = {
	coalition: string;
};

export type Achievements = {
	achievements: string[];
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
	coalition: Coalition;
	setCoalition: React.Dispatch<React.SetStateAction<Coalition>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({children}: UserContextProviderProps) => {
	const [userName, setUserName] = useState<UserName>({userName: ''});
	const [image, setImage] = useState<AuthImage>({image: ''});
	const [achievements, setAchievements] = useState<Achievements>({
		achievements: 0,
	});
	const [coalition, setCoalition] = useState<Coalition>({coalition: ''});
	useEffect(() => {
		const userInfos = getInfosFromDB();
		userInfos.then((res) => {
			setUserName({userName: res.name});
			setImage({image: res.image});
			setAchievements({achievements: res.achievements});
			setCoalition({coalition: res.coalition});
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
				coalition,
				setCoalition,
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
