import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {Link} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './spectate.svg';

interface IProps {
	user: string;
}

function Message({user}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		console.log(userName.userName, 'wants to spectate', user); //TODO
	};

	return (
		<Link to={`/chat/${user}`} onClick={handleClick}>
			<Icon />
			<F.Text>Spectate</F.Text>
		</Link>
	);
}

export default Message;
