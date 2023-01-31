import { ReactNode, createContext, useContext, useState } from "react";

type PopupContextProviderProps = {
  children: React.ReactNode;
};

export type Toggle = {
  toggle: boolean;
};

type PopupContextType = {
  popup: Toggle;
  setPopup: React.Dispatch<React.SetStateAction<Toggle>>;
};

export const PopupContext = createContext({} as PopupContextType);

export const PopupContextProvider = ({
  children,
}: PopupContextProviderProps) => {
  const [popup, setPopup] = useState<Toggle>({ toggle: false });
  console.log(`In my context the value ${popup?.toggle}`);
  return (
    <PopupContext.Provider value={{ popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export function usePopup() {
  return useContext(PopupContext);
}

export default PopupContext;
