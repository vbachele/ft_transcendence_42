import {useContext} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {IUser} from 'types/models';
import {useUserInfos} from 'contexts/User/userContent';
import {fetchFriends} from 'helpers/fetchFriends';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import unlockAchievement from 'helpers/unlockAchievement';
import {userExists} from 'helpers/userExists';
import {ReactComponent as Icon} from './spectate.svg';
import * as F from 'styles/font.styles';
import SocketContext from 'contexts/Socket/context';
import {fetchUserByName} from 'helpers/fetchUserByName';
import {asyncEmit} from '../../../../helpers/asyncEmit';
import {ClientGameEvents, ServerGameEvents} from '../../../../events/game.events';

interface IProps {
	user: IUser;
}

function Spectate({user}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName, setAchievements} = useUserInfos();
	const navigate = useNavigate();

	const handleClick = async () => {
		const exists = await userExists(user.name, userName.userName);
		const friends = await fetchFriends(userName.userName);
		const data = await fetchUserByName(userName.userName, userName.userName);
		const hasWatchAchievement = data?.achievements.includes('WATCH');
		const lobby = await asyncEmit(
			socket!,
			ClientGameEvents.LobbyFromUser,
			{username: user.name},
			ServerGameEvents.LobbyFromUser
		);

		// if (!exists || !isUserIn(friends, user.name) || user.status !== 'ingame') {
		// 	openNotification('warning', `${user.name} can't be spectated`);
		// 	return;
		// }
		navigate({
			pathname: '/spectate',
			search: createSearchParams({
				lobbyId: lobby.lobbyId,
			}).toString(),
		});

		if (data && !hasWatchAchievement) {
			unlockAchievement('WATCH', data, socket);
			setAchievements({achievements: [...data.achievements]});
		}
	};

	return (
		<button onClick={handleClick}>
			<Icon />
			<F.Text>Spectate</F.Text>
		</button>
	);
}

export default Spectate;
