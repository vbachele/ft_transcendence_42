import {ReactNode, createContext, useContext, useState} from 'react';

type PopupContextProviderProps = {
	children: React.ReactNode;
};

export type Toggle = {
	toggle: boolean;
};

export type Navbar = {
	displayNavbar: boolean;
};

type PopupContextType = {
	popup: Toggle;
	setPopup: React.Dispatch<React.SetStateAction<Toggle>>;
	invited: boolean;
	setInvited: React.Dispatch<React.SetStateAction<boolean>>;
	hasInvited: boolean;
	setHasInvited: React.Dispatch<React.SetStateAction<boolean>>;
};
export const PopupContext = createContext({} as PopupContextType);

export const PopupContextProvider = ({children}: PopupContextProviderProps) => {
	const [popup, setPopup] = useState<Toggle>({toggle: false});
	const [invited, setInvited] = useState<boolean>(false);
	const [hasInvited, setHasInvited] = useState<boolean>(false);

	return (
		<PopupContext.Provider
			value={{
				popup,
				setPopup,
				invited,
				setInvited,
				hasInvited,
				setHasInvited,
			}}
		>
			{children}
		</PopupContext.Provider>
	);
};

export function usePopup() {
	return useContext(PopupContext);
}

export default PopupContext;
