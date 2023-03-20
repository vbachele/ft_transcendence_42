import React, {useContext} from 'react';
import SocketContext from '../../../contexts/Socket/context';
import {ClientEvents} from '../../../events/socket.events';
import * as S from '../components/components.styles';
import * as F from '../../../styles/font.styles';
import {displayStatus} from '../modals/ModalUserSearch';
import {IUser} from '../../../types/models';
import {StyledUser} from './components.styles';
import {useUserInfos} from '../../../contexts/User/userContent';
import ChatContext from '../../../contexts/Chat/context';

interface IProps {
	user: IUser;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function User({user, setIsModalOpen}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {lobbyList} = useContext(ChatContext).ChatState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const name = useUserInfos().userName.userName;

	function onClick(event: React.MouseEvent) {
		event.stopPropagation();
		const lobbyName = [user.name + '+' + name, name + '+' + user.name]
		if ([...lobbyList].find((lobby) => lobbyName.includes(lobby.name))) {
			console.log(`lobby found`);
			ChatDispatch({
				type: 'update_active_lobby',
				payload: [...lobbyList].find((lobby) => lobbyName.includes(lobby.name)),
			});
		} else {
			socket?.emit(ClientEvents.CreateLobby, {
				type: 'chat',
				data: {
					maxClients: 2,
					owner: name,
					privacy: 'private',
					init: 'true',
					type: 'direct_message',
					name: user.name + '+' + name,
					description: user.name,
				},
			});
		}
		setIsModalOpen(false);
	}

	return (
		<StyledUser onClick={onClick}>
			<div style={{width: '48px', height: '48px', position: 'relative'}}>
				<S.ProfilePic src={user.image} />
				{displayStatus(user.status)}
			</div>
			<F.Text style={{fontWeight: 600}}> {user.name} </F.Text>
		</StyledUser>
	);
}

export default User;
