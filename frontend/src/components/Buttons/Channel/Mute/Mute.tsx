import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './mute.svg';
import {useContext} from 'react';
import SocketContext from '../../../../contexts/Socket/context';
import {ClientChatEvents} from '../../../../events/chat.events';
import { ILobby } from 'contexts/Chat/context';
import { openNotification } from 'helpers/openNotification';
import { ClientSocialEvents } from 'events/social.events';

interface IProps {
	username: string;
	lobby: ILobby;
}

function Mute({username, lobby}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;

	function muteUser() {
		socket?.emit(ClientChatEvents.MuteUser, {
			nameToMute: username,
			lobbyId: lobby.id,
		});
		openNotification('info', `${username} has been muted in ${lobby.name}`);
		socket?.emit(ClientSocialEvents.SendNotif, {
			sender: lobby.name,
			receiver: username,
			type: 'MUTED',
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
