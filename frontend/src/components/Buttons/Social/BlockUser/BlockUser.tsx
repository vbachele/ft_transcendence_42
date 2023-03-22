import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import {useContext} from 'react';
import SocketContext from 'contexts/Socket/context';
import {ClientSocialEvents} from 'events/social.events';

interface IProps {
	user: IUser;
	hideDrawer?: () => void;
	onBlock?: (user: IUser) => void;
}

function BlockUser({user, hideDrawer, onBlock}: IProps) {
	const {userName} = useUserInfos();
	const {socket} = useContext(SocketContext).SocketState;
	const {data: blocked} = useFetchBlockedOf(userName.userName);

	const handleClick = () => {
		if (isUserIn(blocked, user.name)) {
			return;
		}

		backend.blockUser(userName.userName, user.name);
		backend.removeFriend(userName.userName, user.name);
		backend.removeFriend(user.name, userName.userName);
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);

		socket?.emit(ClientSocialEvents.SendNotif, {
			sender: userName.userName,
			receiver: user.name,
			type: 'BLOCKED',
		});

		if (onBlock) {
			onBlock(user);
		}
		if (hideDrawer) {
			hideDrawer();
		}

		// unlockAchievement('BLOCK', userName.userName); //todo fix invalid hook call

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
