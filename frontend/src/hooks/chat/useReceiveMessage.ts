import {useContext, useEffect, useState} from 'react';
import SocketContext from '../../contexts/Socket/Context';
import {ServerChatEvents} from '../../events/chat.events';
import ChatContext from '../../contexts/Chat/chat.context';
import {act} from 'react-dom/test-utils';

export interface IMessage {
	id: number;
	content: string;
	createdAt: string;
	authorName: string;
	lobbyId: string;
}

export function useReceiveMessage() {
	const {socket} = useContext(SocketContext).SocketState;
	const {activeLobby} = useContext(ChatContext).ChatState;
	const [messages, setMessages] = useState<IMessage[]>([]);

	useEffect(() => {
		setMessages([]);
		activeLobby?.messages.forEach((message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
	}, [activeLobby]);

	useEffect(() => {
		socket?.on(ServerChatEvents.IncomingMessage, (data) => {
			if (activeLobby?.id === data.message.lobbyId) {
				setMessages((message) => [...message, data.message]);
			}
		});
		return () => {
			socket?.off(ServerChatEvents.IncomingMessage);
		};
	}, [socket, activeLobby]);

	return messages;
}
