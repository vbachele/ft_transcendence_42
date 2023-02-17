import LobbyContext from 'contexts/Lobby/Lobby.context';
import {usePopup} from 'contexts/Popup/Popup';
import SocketContext from 'contexts/Socket/Context';
import {ServerEvents} from 'pages/Game/events/game.events';
import {useContext, useEffect} from 'react';
import { TCallback } from 'types/models';

function useInvitedToLobby() {
	const {socket} = useContext(SocketContext).SocketState;
    const {status} = useContext(LobbyContext).LobbyState;
    const dispatch = useContext(LobbyContext).LobbyDispatch;

	const awaitRes = new Promise((resolve, reject) => {
		if (status === 'accepted') {
			console.log(`Invitation status - [${status}]`);
			resolve(status);
		}
    });

	useEffect(() => {
	socket?.on(ServerEvents.InvitedToLobby, async (data, callback) => {
		console.info(`Invitation to a lobby received - [${status}]`);
        const res = await awaitRes;
        callback(res);
        console.log(`res = ${res}`)
	});
	}, [])
}

export default useInvitedToLobby;
