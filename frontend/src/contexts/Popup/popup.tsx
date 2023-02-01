import { ReactNode, createContext, useContext, useState } from "react";

type PopupContextProviderProps = {
  children: React.ReactNode;
};

export type Toggle = {
  toggle: boolean;
};

export type Invite = {
  invited: boolean;
};

export type HasInvited = {
  hasInvited: boolean;
};

type PopupContextType = {
  popup: Toggle;
  setPopup: React.Dispatch<React.SetStateAction<Toggle>>;
  invitation: Invite;
  setInvitation: React.Dispatch<React.SetStateAction<Invite>>;
  hasInvited: HasInvited;
  setHasInvited: React.Dispatch<React.SetStateAction<HasInvited>>;
};
export const PopupContext = createContext({} as PopupContextType);

export const PopupContextProvider = ({
  children,
}: PopupContextProviderProps) => {
  const [popup, setPopup] = useState<Toggle>({ toggle: false });
  const [invitation, setInvitation] = useState<Invite>({ invited: false });
  const [hasInvited, setHasInvited] = useState<HasInvited>({
    hasInvited: false,
  });
  return (
    <PopupContext.Provider
      value={{
        popup,
        setPopup,
        invitation,
        setInvitation,
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
