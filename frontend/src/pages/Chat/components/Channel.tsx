import * as S from './components.styles';
import ChatContext, {ILobby} from 'contexts/Chat/context';
import {useContext, useState} from 'react';
import SocketContext from '../../../contexts/Socket/context';
import {ClientEvents} from '../../../events/socket.events';
import {useUserInfos} from '../../../contexts/User/userContent';
import ModalChanPass from '../modals/ModalChanPass';
import {AiTwotoneLock} from 'react-icons/ai';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {displayStatus} from '../modals/ModalUserSearch';
import styled from 'styled-components';

interface ChannelProps {
	lobby: ILobby;
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Avatar = styled.div`
	position: relative;
	width: 48px;
	height: 48px;
`;

function Channel({lobby}: ChannelProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const name = useUserInfos().userName.userName;
	const user = useFetchUserByName(directMessageName(lobby.name));
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

	function onJoinLobbyPass(event: React.MouseEvent) {
		setPopup(true);
		console.log('POPUP', popup);
	}

	return (
		<S.Channel
			onClick={
				lobby.privacy === 'private' && lobby.type === 'channel'
					? onJoinLobbyPass
					: onJoinLobby
			}
		>
			{lobby.privacy === 'private' && lobby.type === 'channel' && (
				<AiTwotoneLock style={{marginRight: '10px'}} />
			)}
			{lobby.type === 'channel' ? (
				'#' + lobby.name
			) : (
				<Container>
					<Avatar>
						<S.ProfilePic src={user.data?.image} />
						{displayStatus(user.data?.status)}
					</Avatar>
					<div style={{marginLeft: '16px'}}>
						{directMessageName(lobby.name)}
					</div>
				</Container>
			)}
			{popup && (
				<ModalChanPass popup={popup} setPopup={setPopup} lobby={lobby} />
			)}
		</S.Channel>
	);
}

export default Channel;
