import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './invite.svg';
import {ClientEvents, ServerEvents} from '../../../../events/socket.events';
import {useContext, useRef} from 'react';
import SocketContext from '../../../../contexts/Socket/context';
import {ClientGameEvents} from '../../../../events/game.events';
import {usePopup} from '../../../../contexts/Popup/Popup';

interface IProps {
	id: string;
}

function Invite({id}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {hasInvited, setHasInvited} = usePopup();

	function onInvite() {
		console.log(`friend id `, id);
		socket?.emit(ClientEvents.CreateLobby, {
			type: 'game',
			data: {
				mode: 'duo',
			},
		});
		socket?.once(ServerEvents.LobbyMessage, (data) => {
			if (data.message === 'Lobby created') {
				setHasInvited(true);
				console.info(`Sending invitation request`);
				socket?.emit(ClientGameEvents.Invite, {
					lobbyId: data.lobbyId,
					invitedClientName: id,
				});
			}
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
