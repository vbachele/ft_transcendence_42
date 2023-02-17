import SocketContext from 'contexts/Socket/Context';
import {ClientEvents, ServerEvents} from 'pages/Game/events/game.events';
import {useContext, useEffect, useState} from 'react';

interface IParams {
	lobbyId: string;
}

function useJoinLobby(params: IParams) {
	const {socket} = useContext(SocketContext).SocketState;
	const [lobbyState, setLobbyState] = useState(null);

	useEffect(() => {
		socket?.emit(ClientEvents.JoinLobby, {lobbyId: params.lobbyId});
		socket?.on(ServerEvents.LobbyState, (data) => {
			setLobbyState(data);
		});
	}, []);

	return lobbyState;
}

export default useJoinLobby;