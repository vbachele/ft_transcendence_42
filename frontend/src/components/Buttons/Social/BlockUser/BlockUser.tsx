import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {ReactComponent as Icon} from './block.svg';
import * as F from 'styles/font.styles';

interface IProps {
	user: string;
}

function BlockUser({user}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		console.log(userName.userName, 'wants to block', user);
		unlockAchievement('BLOCK', user);
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Block</F.Text>
		</button>
	);
}

export default BlockUser;
