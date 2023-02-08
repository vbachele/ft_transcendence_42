import { ReactNode, createContext, useContext, useState } from "react";
import { IMessages } from '../../pages/Chat/data';

type MessagesContextProviderProps = {
  children: React.ReactNode;
};

type MessagesContextType = {
  myData: IMessages;
  setMyData: React.Dispatch<React.SetStateAction<IMessages>>;
  isClickedDM: boolean;
  setIsClickedDM: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileClicked: boolean;
  setIsMobileClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isClickedChannel: boolean;
  setIsClickedChannel: React.Dispatch<React.SetStateAction<boolean>>;
  isRightBarOpen: boolean;
  setIsRightBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MessagesContext = createContext({} as MessagesContextType);

export const MessagesContextProvider = ({
  children,
}: MessagesContextProviderProps) => {
  const [isClickedDM, setIsClickedDM] = useState<boolean>(false);
  const [isMobileClicked, setIsMobileClicked] = useState<boolean>(false);
  const [isClickedChannel, setIsClickedChannel] = useState<boolean>(false);
  const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false);
  const [myData, setMyData] = useState<IMessages>({id: -1, name: '', avatar: '', time: '', message: '', missedMessages: -1, pastille: -1});
  return (
    <MessagesContext.Provider value={{ myData, setMyData, isClickedDM, setIsClickedDM, isClickedChannel, setIsClickedChannel, isMobileClicked, setIsMobileClicked, isRightBarOpen, setIsRightBarOpen }}>
      {children}
    </MessagesContext.Provider>
  );
};

export function useMessagesContext() {
  return useContext(MessagesContext);
}

export default MessagesContext;