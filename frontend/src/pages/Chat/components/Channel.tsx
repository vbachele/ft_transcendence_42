import * as S from './components.styles';
import ChatContext, {ILobby} from 'contexts/Chat/context';
import {useContext, useEffect, useState} from 'react';
import SocketContext from '../../../contexts/Socket/context';
import {ClientEvents} from '../../../events/socket.events';
import {useUserInfos} from '../../../contexts/User/userContent';
import ModalChanPass from '../modals/ModalChanPass';
import {AiTwotoneLock} from 'react-icons/ai';
import {asyncEmit} from '../../../helpers/asyncEmit';
import {ClientChatEvents, ServerChatEvents} from '../../../events/chat.events';
import {displayStatus} from '../modals/ModalUserSearch';
import {getDirectMessageContact} from '../helpers/getDirectMessageContact';
import {IUser} from '../../../types/models';
import {backend} from '../../../lib/backend';

interface ChannelProps {
	lobby: ILobby;
}

function Channel({lobby}: ChannelProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const name = useUserInfos().userName.userName;
	const [popup, setPopup] = useState<boolean>(false);
	const [unreadMessages, setUnreadMessages] = useState<number>(0);
	const {activeLobby} = useContext(ChatContext).ChatState;
	const [dmUser, setDmUser] = useState<IUser | undefined>(undefined);

	useEffect(() => {
		const fetchDmContact = async () => {
			const username = lobby.name.split('+');
			const contact = await backend.getUser(
				username[0] === name ? username[1] : username[0]
			);
			if (!contact) return;
			setDmUser(contact);
		};
		if (lobby.type === 'direct_message') {
			fetchDmContact();
		}
	}, []);

	useEffect(() => {
		socket?.on(ServerChatEvents.IncomingMessage, (data) => {
			if (data.message.lobbyId === lobby.id && activeLobby?.id !== lobby.id) {
				setUnreadMessages((prev) => prev + 1);
			}
		});
	}, [socket]);

	function onJoinLobby() {
		socket?.emit(ClientEvents.JoinLobby, {lobbyId: lobby.id});
		ChatDispatch({type: 'update_user_panel', payload: false});
	}

	async function onJoinLobbyPass() {
		try {
			const inLobby = await asyncEmit(
				socket!,
				ClientChatEvents.IsInLobby,
				{lobbyId: lobby.id},
				ServerChatEvents.InLobby
			);
			if (inLobby) {
				onJoinLobby();
				return;
			} else {
				setPopup(true);
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<S.Channel
			onClick={
				lobby.privacy === 'private' && lobby.type === 'channel'
					? onJoinLobbyPass
					: onJoinLobby
			}
		>
			{lobby.type === 'channel' ? (
				<S.DMContainer>
					#{lobby.name}
					<div style={{display: 'flex'}}>
						{lobby.privacy === 'private' && (
							<AiTwotoneLock style={{marginRight: '10px'}} />
						)}
						{unreadMessages > 0 && (
							<S.UnreadMessages>{unreadMessages}</S.UnreadMessages>
						)}
					</div>
				</S.DMContainer>
			) : (
				<S.DMContainer>
					<S.Avatar>
						<S.ProfilePic src={dmUser?.image} />
						{displayStatus(dmUser?.status!)}
						<div style={{marginLeft: '16px'}}>{dmUser?.name}</div>
					</S.Avatar>
					{unreadMessages > 0 && (
						<S.UnreadMessages>
							<p>{unreadMessages}</p>
						</S.UnreadMessages>
					)}
				</S.DMContainer>
			)}
			{popup && (
				<ModalChanPass popup={popup} setPopup={setPopup} lobby={lobby} />
			)}
		</S.Channel>
	);
}

export default Channel;
