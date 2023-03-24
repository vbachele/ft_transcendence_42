import * as S from './components.styles';
import ChatContext, {ILobby} from 'contexts/Chat/context';
import {useContext, useState} from 'react';
import SocketContext from '../../../contexts/Socket/context';
import {ClientEvents} from '../../../events/socket.events';
import {useUserInfos} from '../../../contexts/User/userContent';
import ModalChanPass from '../modals/ModalChanPass';

interface ChannelProps {
	lobby: ILobby;
}

function Channel({lobby}: ChannelProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const name = useUserInfos().userName.userName;
	const [popup, setPopup] = useState<boolean>(false);

	function directMessageName(lobbyName: string) {
		const displayedName = lobbyName.split('+');
		if (displayedName[0] === name) return displayedName[1];
		else return displayedName[0];
	}
	function onJoinLobby() {
		socket?.emit(ClientEvents.JoinLobby, {lobbyId: lobby.id});
		ChatDispatch({type: 'update_user_panel', payload: false});
	}

	function onJoinLobbyPass() {
		setPopup(true);
	}

	return (
		<S.Channel
			onClick={lobby.privacy === 'private' ? onJoinLobbyPass : onJoinLobby}
		>
			{lobby.type === 'channel'
				? '#' + lobby.name
				: directMessageName(lobby.name)}
			{popup && <ModalChanPass />}
		</S.Channel>
	);
}

export default Channel;
