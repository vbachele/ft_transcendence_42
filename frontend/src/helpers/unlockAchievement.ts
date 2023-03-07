import {notification} from 'antd';
import {backend} from 'lib/backend';
import AchievementList from 'assets/achievements.json';
import {IAchievement} from 'types/models';
import {useUserInfos} from 'contexts/User/userContent';

const unlockAchievement = async (achName: string) => {
	// get user, //TODO use context
	const data = await backend.getUserByName('Barson');
	const {userName, achievements} = useUserInfos();

	// console.log('user:', userName?.userName);

	// get achievement
	let achievement: IAchievement | undefined = AchievementList.achievements.find(
		(achievement: IAchievement) => achievement.api === achName
	);

	// check if already has achievement
	if (data?.achievements.includes(achievement!.api)) return;

	// add new achievement to the list
	let userAchList = data.achievements;
	userAchList?.push(achievement!.api);

	// patch user
	const patch = {
		achievements: userAchList,
	};
	backend.patchUser('louisnfr', patch); //TODO: use context

	// show notification
	notification.success({
		message: `${achievement?.name}`,
		description: 'New achievement unlocked !',
	});
};

export default unlockAchievement;
