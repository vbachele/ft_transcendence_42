import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';

interface IProps {
	user: string;
}

function BlockUser({user}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		backend.blockUser(userName.userName, user);
		backend.removeFriend(userName.userName, user);
		unlockAchievement('BLOCK', userName.userName);
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Block</F.Text>
		</button>
	);
}

export default BlockUser;
