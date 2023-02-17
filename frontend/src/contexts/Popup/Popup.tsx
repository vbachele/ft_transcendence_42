import { ReactNode, createContext, useContext, useState } from "react";

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
  invitation: boolean;
  setInvitation: React.Dispatch<React.SetStateAction<boolean>>;
  hasInvited: boolean;
  setHasInvited: React.Dispatch<React.SetStateAction<boolean>>;
  invitationStatus: string;
  setInvitationStatus: React.Dispatch<React.SetStateAction<string>>;
};
export const PopupContext = createContext({} as PopupContextType);

export const PopupContextProvider = ({
  children,
}: PopupContextProviderProps) => {
  const [popup, setPopup] = useState<Toggle>({ toggle: false });
  const [invitation, setInvitation] = useState<boolean>(false);
  const [hasInvited, setHasInvited] = useState<boolean>(false);
  const [invitationStatus, setInvitationStatus] = useState<string>('');

  return (
    <PopupContext.Provider
      value={{
        popup,
        setPopup,
        invitation,
        setInvitation,
        hasInvited,
        setHasInvited,
        invitationStatus,
        setInvitationStatus,
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
