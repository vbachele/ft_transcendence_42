import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './invite.svg';
import {ClientEvents, ServerEvents} from '../../../../events/socket.events';
import {useContext} from 'react';
import SocketContext from '../../../../contexts/Socket/context';
import {ClientGameEvents} from '../../../../events/game.events';
import {usePopup} from '../../../../contexts/Popup/Popup';
import {userExists} from 'helpers/userExists';
import {useUserInfos} from 'contexts/User/userContent';
import {fetchFriends} from 'helpers/fetchFriends';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import {IUser} from 'types/models';

interface IProps {
	user: IUser;
}

function Invite({user}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {hasInvited, setHasInvited} = usePopup();
	const {userName} = useUserInfos();

	async function onInvite() {
		const exists = userExists(user.name, userName.userName);
		const friends = await fetchFriends(userName.userName);

		if (!exists || !isUserIn(friends, user.name) || user.status !== 'online') {
			openNotification('warning', `${user.name} can't be invited`);
			return;
		}

		console.log(`friend name `, user.name);
		socket?.emit(ClientEvents.CreateLobby, {
			type: 'game',
			data: {
				mode: 'duo',
			},
		});
		socket?.once(ServerEvents.LobbyMessage, (data) => {
			if (data.message === 'Lobby created') {
				setHasInvited(true);
				console.info(`Sending invitation request`);
				socket?.emit(ClientGameEvents.Invite, {
					lobbyId: data.lobbyId,
					invitedClientName: user.name,
				});
			}
		});
	}

	return (
		<button onClick={onInvite}>
			<Icon />
			<F.Text>Invite to play</F.Text>
		</button>
	);
}

export default Invite;
