import {useUserInfos} from 'contexts/User/userContent';
import {ReactComponent as Icon} from './add.svg';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import * as F from 'styles/font.styles';
import SocketContext from 'contexts/Socket/Context';
import {useContext} from 'react';
import {ClientSocialEvents} from 'events/social.events';

interface IProps {
	user: IUser;
}

function AddFriend({user}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName} = useUserInfos();

	const fetchFriends = async (): Promise<IUser[]> => {
		const data = await backend.getFriendsOf(user.name);
		return data;
	};

	const fetchPendings = async (): Promise<{
		sentPendings: IUser[];
		receivedPendings: IUser[];
	}> => {
		const data = await backend.getPendingsOf(userName.userName);
		return {
			sentPendings: data.sentPendings || [],
			receivedPendings: data.receivedPendings || [],
		};
	};

	const fetchBlocked = async (): Promise<IUser[]> => {
		const data = await backend.getBlockedOf(user.name);
		return data;
	};

	const onAdd = async () => {
		const {receivedPendings} = await fetchPendings();
		const friends = await fetchFriends();
		const blocked = await fetchBlocked();

		if (
			isUserIn(friends, userName.userName) ||
			isUserIn(blocked, userName.userName)
		) {
			openNotification('warning', `${user.name} can't be added`);
			return;
		}

		if (isUserIn(receivedPendings, user.name)) {
			backend.removePending(user.name, userName.userName);
			backend.removePending(userName.userName, user.name);
			backend.addFriend(user.name, userName.userName);
			backend.addFriend(userName.userName, user.name);

			//TODO move this to backend
			//TODO socket on
			// unlockAchievement('ADD', userName.userName);
			// unlockAchievement('ADD', user.name);
			// if (friends && friends.length + 1 >= 3) {
			// 	unlockAchievement('TEAM', user.name);
			// 	unlockAchievement('TEAM', userName.userName);
			// }

			openNotification('success', `${user.name} has been added`);

			return;
		}

		socket?.emit(ClientSocialEvents.SendFriendRequest, {
			senderName: userName.userName,
			receiverName: user.name,
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
