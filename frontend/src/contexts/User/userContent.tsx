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

export type Email = {
	email: string;
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
	doubleAuth: DoubleAuth;
	setDoubleAuth: React.Dispatch<React.SetStateAction<DoubleAuth>>;
	verified2FA: DoubleAuthVerified;
	setVerified2FA: React.Dispatch<React.SetStateAction<DoubleAuthVerified>>;
	email: Email;
	setEmail: React.Dispatch<React.SetStateAction<Email>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({children}: UserContextProviderProps) => {
	const [userName, setUserName] = useState<UserName>({userName: ''});
	const [image, setImage] = useState<AuthImage>({image: ''});
	const [achievements, setAchievements] = useState<Achievements>({
		achievements: [],
	});
	const [coalition, setCoalition] = useState<Coalition>({coalition: ''});
	const [doubleAuth, setDoubleAuth] = useState<DoubleAuth>({doubleAuth: false});
	const [verified2FA, setVerified2FA] = useState<DoubleAuthVerified>({
		verified2FA: false,
	});
	const [email, setEmail] = useState<Email>({email: ''});

	useEffect(() => {
		const userInfos = getInfosFromDB();
		userInfos.then((res) => {
			setUserName({userName: res.name});
			setImage({image: res.image});
			setAchievements({achievements: res.achievements});
			setCoalition({coalition: res.coalition});
			setDoubleAuth({doubleAuth: res.otp_enabled});
			setVerified2FA({verified2FA: res.otp_validated});
			setEmail({email: res.email});
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
				doubleAuth,
				setDoubleAuth,
				verified2FA,
				setVerified2FA,
				email,
				setEmail,
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
