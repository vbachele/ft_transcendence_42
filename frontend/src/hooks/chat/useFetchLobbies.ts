import SocketContext from 'contexts/Socket/Context';
import {ClientChatEvents, ServerChatEvents} from 'events/chat.events';
import {useContext, useEffect, useState} from 'react';
import {ILobby} from '../../contexts/Chat/chat.context';

export function useFetchLobbies() {
	const {socket} = useContext(SocketContext).SocketState;
	const [lobbies, setLobbies] = useState<Set<ILobby>>(new Set<ILobby>());

	useEffect(() => {
		socket?.emit(ClientChatEvents.FetchLobbies)
		socket?.on(ServerChatEvents.LobbyList, (data) => {
			setLobbies(data);
		});
		return () => {
			socket?.off(ServerChatEvents.LobbyList);
		}
	}, []);

	return lobbies;
}