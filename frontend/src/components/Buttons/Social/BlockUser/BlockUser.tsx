import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import {notification} from 'antd';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';

interface IProps {
	user: IUser;
	hideDrawer?: () => void;
	onBlock?: (user: IUser) => void;
}

const isBlocked = (blocked: IUser[] | null, user: IUser): boolean => {
	return (
		blocked?.some((blockedUser) => blockedUser.name === user.name) ?? false
	);
};

function BlockUser({user, hideDrawer, onBlock}: IProps) {
	const {userName} = useUserInfos();
	const {data: blocked} = useFetchBlockedOf(userName.userName);

	const handleClick = () => {
		if (isBlocked(blocked, user)) {
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

		notification.info({
			message: `${user.name} has been blocked`,
			placement: 'bottom',
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
