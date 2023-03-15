import SocketContext from 'contexts/Socket/Context';
import {ClientChatEvents, ServerChatEvents} from 'events/chat.events';
import {useContext, useEffect, useState} from 'react';

export function useFetchLobbies() {
	const {socket} = useContext(SocketContext).SocketState;
	const [lobbies, setLobbies] = useState<any[]>([]);

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