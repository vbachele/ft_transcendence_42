import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './remove.svg';

interface IProps {
	user: string;
}

function RemoveFriend({user}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		backend.addFriend(userName.userName, user);
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Remove friend</F.Text>
		</button>
	);
}

export default RemoveFriend;
