import * as S from './components.styles';
import ChatContext, {ILobby} from 'contexts/Chat/context';
import {useContext, useState} from 'react';
import SocketContext from '../../../contexts/Socket/context';
import {ClientEvents} from '../../../events/socket.events';
import {useUserInfos} from '../../../contexts/User/userContent';
import ModalChanPass from '../modals/ModalChanPass';
import {AiTwotoneLock} from "react-icons/ai";


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
		console.log("POPUP", popup);
		
	}
	function handleModalClose() {
		setPopup(!popup);
		console.log("POPUP cLOSE", popup);
	}

	return (
		<S.Channel
			onClick={lobby.privacy === 'private' && lobby.type ==="channel" ? onJoinLobbyPass : onJoinLobby}
		>
			{lobby.privacy === 'private' && lobby.type ==="channel"  && <AiTwotoneLock style={{ marginRight: '10px' }}  />}
			{lobby.type === 'channel'
				? '#' + lobby.name
				: directMessageName(lobby.name)}
			{popup && <ModalChanPass click={popup}
					onClose={handleModalClose} lobby={lobby} />}
		</S.Channel>
	);
}

export default Channel;
