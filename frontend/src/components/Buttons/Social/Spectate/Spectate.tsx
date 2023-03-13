import {useUserInfos} from 'contexts/User/userContent';
import unlockAchievement from 'helpers/unlockAchievement';
import {useNavigate} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './spectate.svg';

interface IProps {
	user: string;
}

function Message({user}: IProps) {
	const {userName} = useUserInfos();
	const navigate = useNavigate();

	const handleClick = () => {
		console.log(userName.userName, 'wants to spectate', user); //TODO
		navigate(`/specate/${user}`);

		unlockAchievement('WATCH', userName.userName);
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Spectate</F.Text>
		</button>
	);
}

export default Message;
