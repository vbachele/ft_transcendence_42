import { ReactNode, createContext, useContext, useState } from "react";
import { IUser } from "types/models";
import { IMessages, IChannels } from '../../pages/Chat/data';

type MessagesContextProviderProps = {
  children: React.ReactNode;
};

type MessagesContextType = {
  dataMessages: IUser;
  setDataMessages: React.Dispatch<React.SetStateAction<IUser>>;
  dataChannels: IChannels;
  setDataChannels: React.Dispatch<React.SetStateAction<IChannels>>;
  isClickedDM: boolean;
  setIsClickedDM: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileClicked: boolean;
  setIsMobileClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isClickedChannel: boolean;
  setIsClickedChannel: React.Dispatch<React.SetStateAction<boolean>>;
  isRightBarOpenDM: boolean;
  setIsRightBarOpenDM: React.Dispatch<React.SetStateAction<boolean>>;
  isRightBarOpenChannel: boolean;
  setIsRightBarOpenChannel: React.Dispatch<React.SetStateAction<boolean>>;
  isRightBarClosedDM: boolean;
  setIsRightBarClosedDM: React.Dispatch<React.SetStateAction<boolean>>;
  isRightBarClosedChannel: boolean;
  setIsRightBarClosedChannel: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitted: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  isPopupClicked: boolean;
  setIsPopupClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MessagesContext = createContext({} as MessagesContextType);

export const MessagesContextProvider = ({
  children,
}: MessagesContextProviderProps) => {
  const [isClickedDM, setIsClickedDM] = useState<boolean>(false);
  const [isMobileClicked, setIsMobileClicked] = useState<boolean>(false);
  const [isClickedChannel, setIsClickedChannel] = useState<boolean>(false);
  const [isRightBarOpenDM, setIsRightBarOpenDM] = useState<boolean>(false);
  const [isRightBarClosedDM, setIsRightBarClosedDM] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isRightBarClosedChannel, setIsRightBarClosedChannel] = useState<boolean>(false);
  const [isRightBarOpenChannel, setIsRightBarOpenChannel] = useState<boolean>(false);
  const [isPopupClicked, setIsPopupClicked] = useState<boolean>(false);
  const [dataChannels, setDataChannels] = useState<IChannels>({name: '', id: -1});
  const [dataMessages, setDataMessages] = useState<IUser>({id: -1, name: '', image: '', coalition: '', status: '', score: -1, games: -1, wins: -1, ratio: -1, achievements: []});
  return (
    <MessagesContext.Provider value={{ dataMessages, setDataMessages, dataChannels, setDataChannels, 
    isClickedDM, setIsClickedDM, isClickedChannel, setIsClickedChannel, isMobileClicked, setIsMobileClicked,
    isRightBarOpenDM, setIsRightBarOpenDM, isRightBarOpenChannel, setIsRightBarOpenChannel, isRightBarClosedDM,
    setIsRightBarClosedDM, isRightBarClosedChannel, setIsRightBarClosedChannel, isSubmitted, setIsSubmitted, isPopupClicked, setIsPopupClicked }}>
      {children}
    </MessagesContext.Provider>
  );
};

export function useMessagesContext() {
  return useContext(MessagesContext);
}

export default MessagesContext;