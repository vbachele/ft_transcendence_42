import SocketContext from 'contexts/Socket/Context';
import {ClientEvents} from 'pages/Game/events/game.events';
import {useContext, useEffect} from 'react';

interface IParams {
	invitedClient: string;
}

function useInviteToLobby(params: IParams) {
	const {socket} = useContext(SocketContext).SocketState;
	useEffect(() => {
		socket?.emit(ClientEvents.InviteToLobby, {
			invitedClient: params.invitedClient,
		});
	}, []);
}

export default useInviteToLobby;
