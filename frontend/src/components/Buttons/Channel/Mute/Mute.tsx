import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './mute.svg';
import {useContext} from 'react';
import SocketContext from '../../../../contexts/Socket/context';
import {ClientChatEvents} from '../../../../events/chat.events';

interface IProps {
	username: string;
	lobbyId: string;
}

function Mute({username, lobbyId}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;

	function muteUser() {
		socket?.emit(ClientChatEvents.MuteUser, {
			nameToMute: username,
			lobbyId: lobbyId,
		});
	}

	return (
		<button onClick={muteUser}>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Mute</F.Text>
		</button>
	);
}

export default Mute;
