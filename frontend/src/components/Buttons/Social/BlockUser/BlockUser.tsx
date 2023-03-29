import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import {userExists} from 'helpers/userExists';
import {useContext} from 'react';
import SocketContext from 'contexts/Socket/context';
import * as F from 'styles/font.styles';
import {fetchUserByName} from 'helpers/fetchUserByName';
import {ClientSocialEvents} from 'events/social.events';

interface IProps {
	user: IUser;
	hideDrawer?: () => void;
	onBlock?: (user: IUser) => void;
}

function BlockUser({user, hideDrawer, onBlock}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName, setAchievements} = useUserInfos();
	const {data: blocked} = useFetchBlockedOf(userName.userName);

	const handleClick = async () => {
		const exists = await userExists(user.name, userName.userName);
		const data = await fetchUserByName(userName.userName, userName.userName);
		const hasBlockAchievement = data?.achievements.includes('BLOCK');

		if (!exists || isUserIn(blocked, user.name)) {
			openNotification('warning', `${user.name} can't be blocked`);
			return;
		}

		backend.blockUser(userName.userName, user.name);
		backend.removeFriend(userName.userName, user.name);
		backend.removeFriend(user.name, userName.userName);
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);

		if (data && !hasBlockAchievement) {
			unlockAchievement('BLOCK', data, socket);
			setAchievements({achievements: [...data.achievements]});

			openNotification(
				'success',
				'You have unlocked a new achievement !',
				'topRight'
			);
		}

		if (onBlock) {
			onBlock(user);
		}
		if (hideDrawer) {
			hideDrawer();
		}

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
