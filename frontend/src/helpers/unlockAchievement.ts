import {notification} from 'antd';
import {backend} from 'lib/backend';
import AchievementList from 'assets/achievements.json';
import {IAchievement, IUser} from 'types/models';
import {useContext} from 'react';
import SocketContext from 'contexts/Socket/context';
import {openNotification} from './openNotification';
import {ClientSocialEvents} from 'events/social.events';
import {Socket} from 'socket.io-client';

const unlockAchievement = async (achName: string, user: IUser) => {
	const {socket} = useContext(SocketContext).SocketState; //todo invalid hook call

	// get achievement
	let achievement: IAchievement | undefined = AchievementList.achievements.find(
		(achievement: IAchievement) => achievement.api === achName
	);

	// check if user already has achievement
	if (user.achievements.includes(achievement!.api)) return;

	// add new achievement to the list of user achievements
	let userAchList = user.achievements;
	userAchList?.push(achievement!.api);

	// patch user
	const patch = {
		achievements: userAchList,
	};
	backend.patchUser(user.name, patch);

	// show notification

	// notification.success({
	// 	message: `${achievement?.name}`,
	// 	description: 'New achievement unlocked !',
	// 	duration: 3,
	// 	placement: 'topRight',
	// });
	socket?.emit(ClientSocialEvents.SendNotif, {
		sender: user.name,
		receiver: user.name,
		type: 'ACHIEVEMENT',
	});
};

export default unlockAchievement;
