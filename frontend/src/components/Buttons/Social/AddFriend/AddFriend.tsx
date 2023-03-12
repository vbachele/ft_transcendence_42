import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './add.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import {notification} from 'antd';
import {IUser} from 'types/models';

interface IProps {
	user: IUser;
}

const isAdded = (blocked: IUser[] | null, user: IUser): boolean => {
	return (
		blocked?.some((blockedUser) => blockedUser.name === user.name) ?? false
	);
};

function AddFriend({user}: IProps) {
	const {userName} = useUserInfos();
	const {data: friends} = useFetchFriendsOf(userName.userName);

	const handleClick = () => {
		if (isAdded(friends, user)) {
			return;
		}

		backend.unblockUser(userName.userName, user.name);
		backend.addFriend(userName.userName, user.name);
		unlockAchievement('ADD', userName.userName);
		if (friends && friends.length + 1 >= 3) {
			unlockAchievement('TEAM', userName.userName);
		}

		notification.info({
			message: `${user.name} has been added`,
			placement: 'bottom',
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
