import React, {useContext} from 'react';
import SocketContext from '../../../contexts/Socket/context';
import {ClientEvents, ServerEvents} from '../../../events/socket.events';
import * as S from '../components/components.styles';
import * as F from '../../../styles/font.styles';
import {displayStatus} from '../modals/ModalUserSearch';
import {IUser} from '../../../types/models';
import {StyledUser} from './components.styles';
import {useUserInfos} from '../../../contexts/User/userContent';
import ChatContext from '../../../contexts/Chat/context';
import {asyncEmit} from '../../../helpers/asyncEmit';
import {ClientChatEvents, ServerChatEvents} from '../../../events/chat.events';

interface IProps {
	user: IUser;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	type: 'newDirectMessage' | 'openUserPanel';
}

function User({user, setIsModalOpen, type}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {lobbyList} = useContext(ChatContext).ChatState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const name = useUserInfos().userName.userName;

	async function createDirectMessage(event: React.MouseEvent) {
		event.stopPropagation();
		console.log(`create direct message with ${user.name}`);
		const lobby = {
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
		};
		try {
			const res = await asyncEmit(
				socket!,
				ClientChatEvents.FetchLobby,
				{lobbyName: lobby.data.name},
				ServerChatEvents.Lobby
			);
			console.log(`res = `, res);
			if (res.lobby) {
				socket?.emit(ClientEvents.JoinLobby, {lobbyId: res.lobby.id});
			} else {
				socket?.emit(ClientEvents.CreateLobby, lobby);
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error(error);
		}
	}

	function openUserPanel(event: React.MouseEvent) {
		event.stopPropagation();
		ChatDispatch({type: 'active_user_in_panel', payload: user});
		ChatDispatch({type: 'update_user_panel', payload: true});
		setIsModalOpen(false);
	}

	return (
		<StyledUser
			onClick={
				type === 'newDirectMessage' ? createDirectMessage : openUserPanel
			}
		>
			<div style={{width: '48px', height: '48px', position: 'relative'}}>
				<S.ProfilePic src={user.image} />
				{displayStatus(user.status)}
			</div>
			<F.Text style={{fontWeight: 600}}> {user.name} </F.Text>
		</StyledUser>
	);
}

export default User;
