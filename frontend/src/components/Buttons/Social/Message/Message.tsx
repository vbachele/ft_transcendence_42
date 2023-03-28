import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {Link, useNavigate} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './message.svg';

interface IProps {
	user: string;
}

function Message({user}: IProps) {
	const {userName} = useUserInfos();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/chat`);
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Message</F.Text>
		</button>
	);
}

export default Message;
