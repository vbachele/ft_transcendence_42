import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './admin.svg';
import React, {useContext} from 'react';
import SocketContext from '../../../../contexts/Socket/context';
import {ClientChatEvents} from '../../../../events/chat.events';

interface IProps {
	username: string;
	lobbyId: string;
}

function AdminRights({username, lobbyId}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;

	function setAdmin(event: React.MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		socket?.emit(ClientChatEvents.SetAdmin, {
			nameToSetAdmin: username,
			lobbyId: lobbyId,
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
