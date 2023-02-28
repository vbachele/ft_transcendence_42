import {IAchievement, IUser} from 'types/models';
import * as S from './Achievements.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import Card from './Card';
import AchievementList from 'assets/achievements.json';

interface IProps {
	user: IUser;
}

const Achievements = ({user}: IProps) => {
	let achList: IAchievement[] = [];

	for (let value in AchievementList.achievements) {
		achList.push(AchievementList.achievements[value]);
	}

	return (
		<S.Container>
			<F.Subtitle weight="700" fontSize="30px">
				Achievements - {user.achievements.length} / {achList.length}
			</F.Subtitle>
			<S.Achievements>
				{achList.map((achievement) => (
					<Card
						achievement={achievement}
						unlocked={user.achievements.includes(achievement.api)}
						key={achievement.id}
					/>
				))}
			</S.Achievements>
		</S.Container>
	);
};

export default Achievements;
