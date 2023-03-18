import {useUserInfos} from 'contexts/User/userContent';
import {openNotification} from 'helpers/notification';
import {backend} from 'lib/backend';
import * as F from 'styles/font.styles';
import {IUser} from 'types/models';
import {ReactComponent as Icon} from './remove.svg';

interface IProps {
	user: IUser;
	hideDrawer?: () => void;
	onRemove?: (user: IUser) => void;
}

function RemoveFriend({user, hideDrawer, onRemove}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		backend.removeFriend(userName.userName, user.name);
		backend.removeFriend(user.name, userName.userName);
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);

		if (onRemove) {
			onRemove(user);
		}

		if (hideDrawer) {
			hideDrawer();
		}

		openNotification('error', `${user.name} has been removed`);
	};

	return (
		<button onClick={handleClick}>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Remove friend</F.Text>
		</button>
	);
}

export default RemoveFriend;
