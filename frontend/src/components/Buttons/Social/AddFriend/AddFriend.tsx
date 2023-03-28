import {useContext} from 'react';
import {useUserInfos} from 'contexts/User/userContent';
import SocketContext from 'contexts/Socket/context';
import {ClientSocialEvents} from 'events/social.events';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import {fetchPendings} from 'helpers/fetchPendings';
import {fetchFriends} from 'helpers/fetchFriends';
import {fetchBlocked} from 'helpers/fetchBlocked';
import {userExists} from 'helpers/userExists';
import {addUserToFriends} from 'helpers/addUserToFriends';
import {ReactComponent as Icon} from './add.svg';
import * as F from 'styles/font.styles';

interface IProps {
	user: IUser;
}

function AddFriend({user}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName} = useUserInfos();

	const onAdd = async () => {
		const {receivedPendings} = await fetchPendings(userName.userName);
		const friends = await fetchFriends(userName.userName);
		const blocked = await fetchBlocked(user.name);
		const exists = await userExists(user.name, userName.userName);

		if (
			!exists ||
			isUserIn(friends, userName.userName) ||
			isUserIn(blocked, userName.userName)
		) {
			openNotification('warning', `${user.name} can't be added`);
			return;
		}

		if (isUserIn(receivedPendings, user.name)) {
			addUserToFriends(userName.userName, user.name, socket);
			addUserToFriends(user.name, userName.userName, socket);

			socket?.emit(ClientSocialEvents.SendNotif, {
				sender: userName.userName,
				receiver: user.name,
				type: 'FRIEND_ACCEPT',
			});

			openNotification('success', `${user.name} has been added`);
			return;
		}

		socket?.emit(ClientSocialEvents.SendNotif, {
			sender: userName.userName,
			receiver: user.name,
			type: 'FRIEND_REQUEST',
		});

		backend.addPending(user.name, userName.userName);
		openNotification('info', `Friend request sent to ${user.name}`);
	};

	return (
		<button onClick={onAdd}>
			<Icon />
			<F.Text>Add friend</F.Text>
		</button>
	);
}

export default AddFriend;
