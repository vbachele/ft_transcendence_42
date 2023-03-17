import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './add.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import {notification} from 'antd';
import {IUser} from 'types/models';
import isUserIn from 'helpers/isUserIn';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';

interface IProps {
	user: IUser;
}

function AddFriend({user}: IProps) {
	const {userName} = useUserInfos();

	const fetchFriends = async (): Promise<IUser[]> => {
		const data = await backend.getFriendsOf(user.name);
		return data;
	};
	const fetchPendings = async (): Promise<IUser[]> => {
		const data = await backend.getPendingsOf(userName.userName);
		return data;
	};
	const fetchBlocked = async (): Promise<IUser[]> => {
		const data = await backend.getBlockedOf(user.name);
		return data;
	};

	const handleClick = async () => {
		const friends = await fetchFriends();
		const pendings = await fetchPendings();
		const blocked = await fetchBlocked();

		if (
			isUserIn(friends, userName.userName) ||
			isUserIn(blocked, userName.userName)
		) {
			notification.warning({
				message: (
					<div style={{marginBottom: -8}}>{`${user.name} can't be added`}</div>
				),
				placement: 'top',
				duration: 2.5,
			});
			return;
		}

		if (isUserIn(pendings, user.name)) {
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

			notification.success({
				message: (
					<div style={{marginBottom: -8}}>{`${user.name} has been added`}</div>
				),
				placement: 'top',
				duration: 2.5,
			});

			return;
		}

		backend.addPending(user.name, userName.userName);

		notification.info({
			message: (
				<div
					style={{marginBottom: -8}}
				>{`${user.name} has been requested`}</div>
			),
			placement: 'top',
			duration: 2.5,
		});
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Add friend</F.Text>
		</button>
	);
}

export default AddFriend;
