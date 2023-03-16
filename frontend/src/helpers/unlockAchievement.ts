import {notification} from 'antd';
import {backend} from 'lib/backend';
import AchievementList from 'assets/achievements.json';
import {IAchievement} from 'types/models';
import useFetchUserByName from 'hooks/useFetchUserByName';

const unlockAchievement = async (achName: string, userName: string) => {
	// get user
	const {data} = useFetchUserByName(userName);
	if (!data) {
		return;
	}

	// get achievement
	let achievement: IAchievement | undefined = AchievementList.achievements.find(
		(achievement: IAchievement) => achievement.api === achName
	);

	// check if user already has achievement
	if (data?.achievements.includes(achievement!.api)) return;

	// add new achievement to the list of user achievements
	let userAchList = data.achievements;
	userAchList?.push(achievement!.api);

	// patch user
	const patch = {
		achievements: userAchList,
	};
	backend.patchUser(userName, patch);

	// show notification
	notification.success({
		message: `${achievement?.name}`,
		description: 'New achievement unlocked !',
		duration: 3,
	});
};

export default unlockAchievement;
