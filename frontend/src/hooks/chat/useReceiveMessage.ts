import {useContext, useEffect, useState} from 'react';
import SocketContext from '../../contexts/Socket/context';
import {ServerChatEvents} from '../../events/chat.events';
import ChatContext, {ILobby} from '../../contexts/Chat/context';
import {act} from 'react-dom/test-utils';
import useFetchBlockedOf from '../useFetchBlocked';
import {useUserInfos} from '../../contexts/User/userContent';
import {fetchBlockList} from '../../helpers/fetchBlockList';

export interface IMessage {
	id: number;
	content: string;
	createdAt: string;
	authorName: string;
	lobbyId: string;
}

export function useReceiveMessage(activeLobby: ILobby | undefined) {
	const {socket} = useContext(SocketContext).SocketState;
	const [messages, setMessages] = useState<IMessage[]>([]);
	const username = useUserInfos().userName.userName;
	const [blockList, setBlockList] = useState<any[]>([]);

	useEffect(() => {
		fetchBlockList(socket!).then((data) => {
			if (data) {
				setBlockList(data);
			}
		});
	}, []);

	useEffect(() => {
		setMessages([]);
		if (!activeLobby?.messages) return;
		activeLobby?.messages.forEach((message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
	}, [activeLobby]);

	useEffect(() => {
		socket?.on(ServerChatEvents.IncomingMessage, (body) => {
			if (
				activeLobby?.id === body.message.lobbyId &&
				!blockList?.find((blocked) => blocked === body.message.authorName)
			) {

				setMessages((message) => [...message, body.message]);
			}
		});
		return () => {
			socket?.off(ServerChatEvents.IncomingMessage);
		};
	}, [socket, activeLobby]);

	return messages;
}
