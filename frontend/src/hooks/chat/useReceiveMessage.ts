import {useContext, useEffect, useState} from 'react';
import SocketContext from '../../contexts/Socket/Context';
import {ServerChatEvents} from '../../events/chat.events';

export function useReceiveMessage(lobbyId: string) {
	const {socket} = useContext(SocketContext).SocketState;
	const [messages, setMessages] = useState<string[]>([]);
	const [currentLobbyId, setCurrentLobbyId] = useState<string | null>();

	useEffect(() => {
		setMessages([]);
		setCurrentLobbyId(lobbyId);
	}, [lobbyId]);

	useEffect(() => {
		socket?.on(ServerChatEvents.IncomingMessage, (data) => {
			if (lobbyId === data.lobbyId) {
				setMessages((message) => [...message, data.message]);
			}
		});
		return () => {
			socket?.off(ServerChatEvents.IncomingMessage);
		};
	}, [socket, currentLobbyId]);

	return messages;
}
