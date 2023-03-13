import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './add.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import {notification} from 'antd';
import {IUser} from 'types/models';
import isUserIn from 'helpers/isUserIn';

interface IProps {
	user: IUser;
}

function AddFriend({user}: IProps) {
	const {userName} = useUserInfos();
	const {data: friends} = useFetchFriendsOf(userName.userName);
	let userAdded: boolean = false; //TODO normalement useless

	const handleClick = () => {
		if (isUserIn(friends, user) || userAdded) {
			return;
		}

		backend.unblockUser(userName.userName, user.name);
		backend.addFriend(userName.userName, user.name);

		unlockAchievement('ADD', userName.userName);
		if (friends && friends.length + 1 >= 3) {
			unlockAchievement('TEAM', userName.userName);
		}
		userAdded = true;

		notification.info({
			message: (
				<div style={{marginBottom: -8}}>{`${user.name} has been added`}</div>
			),
			placement: 'bottom',
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
