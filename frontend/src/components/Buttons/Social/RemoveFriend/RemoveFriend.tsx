import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import * as F from 'styles/font.styles';
import {IUser} from 'types/models';
import {ReactComponent as Icon} from './remove.svg';

interface IProps {
	user: IUser;
	hideDrawer?: () => void;
	onRemove: (user: IUser) => void;
}

function RemoveFriend({user, hideDrawer, onRemove}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		backend.removeFriend(userName.userName, user.name).then(() => {
			if (onRemove) {
				onRemove(user);
			}
		});

		if (hideDrawer) {
			hideDrawer();
		}
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Remove friend</F.Text>
		</button>
	);
}

export default RemoveFriend;
