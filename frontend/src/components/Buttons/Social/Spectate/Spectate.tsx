import {useUserInfos} from 'contexts/User/userContent';
import {fetchFriends} from 'helpers/fetchFriends';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import unlockAchievement from 'helpers/unlockAchievement';
import {userExists} from 'helpers/userExists';
import {useNavigate} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {IUser} from 'types/models';
import {ReactComponent as Icon} from './spectate.svg';

interface IProps {
	user: IUser;
}

function Spectate({user}: IProps) {
	const {userName} = useUserInfos();
	const navigate = useNavigate();

	const handleClick = async () => {
		const exists = await userExists(user.name, userName.userName);
		const friends = await fetchFriends(userName.userName);

		if (!exists || !isUserIn(friends, user.name) || user.status !== 'ingame') {
			openNotification('warning', `${user} can't be spectated`);
			return;
		}

		console.log(userName.userName, 'wants to spectate', user);
		navigate(`/spectate/${user}`);
		// unlockAchievement('WATCH', userName.userName); //todo invalid hook call
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Spectate</F.Text>
		</button>
	);
}

export default Spectate;
