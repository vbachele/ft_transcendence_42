import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './invite.svg';
import useInviteToLobby from '../../../../hooks/Lobby/useInviteToLobby';
import {
	ClientEvents,
	ServerEvents,
} from '../../../../pages/Game/events/game.events';
import {GameEvents} from '../../../../contexts/Lobby/events';
import {useContext} from 'react';
import SocketContext from '../../../../contexts/Socket/Context';
import LobbyContext from '../../../../contexts/Lobby/lobby.context';

interface IProps {
	id: string;
}

function Invite({id}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const lobbyDispatch = useContext(LobbyContext).LobbyDispatch;

	// useInviteToLobby({invitedClient: id, type: 'game'});
	function onInvite() {
		socket?.emit(ClientEvents.CreateLobby, {mode: 'duo', type: 'game'});
		socket?.once(ServerEvents.LobbyMessage, (data) => {
			if (data.message === 'Lobby created') {
				console.info(`Sending invitation request`);
				lobbyDispatch({type: 'update_status', payload: GameEvents.Invited});
				socket?.emit(ClientEvents.InviteToLobby, {
					invitedClient: id,
				});
			}
		});

		socket?.on(ServerEvents.InvitationDeclined, () => {
			lobbyDispatch({type: 'update_status', payload: GameEvents.Declined});
		});
	}

	return (
		<button onClick={onInvite}>
			<Icon />
			<F.Text>Invite to play</F.Text>
		</button>
	);
}

export default Invite;
