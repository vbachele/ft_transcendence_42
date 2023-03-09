import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {Link} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './message.svg';

interface IProps {
	user: string;
}

function Message({user}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		console.log(userName.userName, 'wants to chat with', user); //TODO
	};

	return (
		<Link to={`/chat/${user}`} onClick={handleClick}>
			<Icon />
			<F.Text>Message</F.Text>
		</Link>
	);
}

export default Message;
