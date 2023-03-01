import SocketContext from 'contexts/Socket/Context';
import {ClientEvents, ServerEvents} from 'pages/Game/events/game.events';
import {useContext, useEffect} from 'react';
import {GameEvents} from '../../contexts/Lobby/events';
import LobbyContext from "../../contexts/Lobby/lobby.context";

type TLobbyType = 'game' | 'chat';

interface IParams {
	invitedClient: string;
	type: TLobbyType;
}

function useInviteToLobby(params: IParams) {
	const {socket} = useContext(SocketContext).SocketState;
	const lobbyDispatch = useContext(LobbyContext).LobbyDispatch;

	useEffect(() => {
		socket?.emit(ClientEvents.CreateLobby, {mode: 'duo', type: params.type});
		socket?.once(ServerEvents.LobbyMessage, (data) => {
			if (data.message === 'Lobby created') {
				console.info(`Sending invitation request`);
				lobbyDispatch({type: 'update_status', payload: GameEvents.Invited});
				socket?.emit(ClientEvents.InviteToLobby, {
					invitedClient: params.invitedClient,
				});
			}
		});

		socket?.on(ServerEvents.InvitationDeclined, () => {
			lobbyDispatch({type: 'update_status', payload: GameEvents.Declined});
		});

		return () => {
			socket?.off(ServerEvents.LobbyMessage);
			socket?.off(ServerEvents.InvitationDeclined);
		}
	}, []);
}

export default useInviteToLobby;
