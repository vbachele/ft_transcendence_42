import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './admin.svg';
import React, {useContext} from 'react';
import SocketContext from '../../../../contexts/Socket/context';
import {ClientChatEvents} from '../../../../events/chat.events';
import { ILobby } from 'contexts/Chat/context';
import { openNotification } from 'helpers/openNotification';
import { ClientSocialEvents } from 'events/social.events';

interface IProps {
	username: string;
	lobby: ILobby;
}

function AdminRights({username, lobby}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;

	function setAdmin(event: React.MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		socket?.emit(ClientChatEvents.SetAdmin, {
			nameToSetAdmin: username,
			lobbyId: lobby.id,
		});
		openNotification('info', `${username} is now admin in ${lobby.name}`);
		socket?.emit(ClientSocialEvents.SendNotif, {
			sender: lobby.name,
			receiver: username,
			type: 'ADMIN',
		});
	}

	return (
		<button onClick={setAdmin}>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Give administrator rights</F.Text>
		</button>
	);
}

export default AdminRights;
