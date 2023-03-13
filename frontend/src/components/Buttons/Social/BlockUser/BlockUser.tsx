import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import {notification} from 'antd';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';
import isUserIn from 'helpers/isUserIn';

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
		if (isUserIn(blocked, user) || userAdded) {
			return;
		}

		backend.blockUser(userName.userName, user.name);
		backend.removeFriend(userName.userName, user.name);

		if (onBlock) {
			onBlock(user);
		}
		if (hideDrawer) {
			hideDrawer();
		}

		unlockAchievement('BLOCK', userName.userName);
		userAdded = true;

		notification.info({
			message: (
				<div style={{marginBottom: -8}}>{`${user.name} has been blocked`}</div>
			),
			placement: 'bottom',
			duration: 2.5,
		});
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Block</F.Text>
		</button>
	);
}

export default BlockUser;
