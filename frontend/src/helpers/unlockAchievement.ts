import {backend} from 'lib/backend';
import AchievementList from 'assets/achievements.json';
import {IAchievement, IUser} from 'types/models';
import {useContext} from 'react';
import SocketContext from 'contexts/Socket/context';
import {openNotification} from './openNotification';
import {ClientSocialEvents} from 'events/social.events';

const unlockAchievement = async (achName: string, user: IUser, socket: any) => {
	// get achievement
	let achievement: IAchievement | undefined = AchievementList.achievements.find(
		(achievement: IAchievement) => achievement.api === achName
	);

	// add new achievement to the list of user achievements
	let userAchList = user.achievements;
	userAchList?.push(achievement!.api);

	// patch user
	const score = Math.round(
		((user.games * 50 + user.wins * 200) / (user.ratio + 1)) *
			(userAchList.length / 15 + 1)
	);
	const patch = {
		achievements: userAchList,
		score: score,
	};
	backend.patchUser(user.name, patch);

	// show notification
	socket?.emit(ClientSocialEvents.SendNotif, {
		sender: achName,
		receiver: user.name,
		type: 'ACHIEVEMENT',
	});
};

export default unlockAchievement;
