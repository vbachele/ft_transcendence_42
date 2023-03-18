import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/notification';

interface IProps {
	user: IUser;
	hideDrawer?: () => void;
	onBlock?: (user: IUser) => void;
}

function BlockUser({user, hideDrawer, onBlock}: IProps) {
	const {userName} = useUserInfos();
	const {data: blocked} = useFetchBlockedOf(userName.userName);
	let userAdded: boolean = false; //TODO normalement useless

	const handleClick = () => {
		if (isUserIn(blocked, user.name) || userAdded) {
			return;
		}

		backend.blockUser(userName.userName, user.name);
		backend.removeFriend(userName.userName, user.name);
		backend.removeFriend(user.name, userName.userName);
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);

		if (onBlock) {
			onBlock(user);
		}
		if (hideDrawer) {
			hideDrawer();
		}

		unlockAchievement('BLOCK', userName.userName);
		userAdded = true;

		openNotification('error', `${user.name} has been blocked`);
	};

	return (
		<button onClick={handleClick}>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Block</F.Text>
		</button>
	);
}

export default BlockUser;
