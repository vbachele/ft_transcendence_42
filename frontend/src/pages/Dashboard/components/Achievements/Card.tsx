import * as S from './Achievements.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {IAchievement} from 'types/models';

interface IProps {
	achievement: IAchievement;
	unlocked: boolean;
}

const Card = ({achievement, unlocked}: IProps) => {
	return (
		<S.Card unlocked={unlocked}>
			<S.Icon src={achievement.image} />
			<div className="vertical">
				<F.Text>{achievement.name}</F.Text>
				<F.Subtitle>{achievement.description}</F.Subtitle>
			</div>
			<S.State unlocked={unlocked}>{unlocked ? `Unlocked` : `Locked`}</S.State>
		</S.Card>
	);
};

export default Card;
