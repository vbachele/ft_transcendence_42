import * as S from './Achievements.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {IAchievement} from 'types/models';
import {ReactComponent as Icon} from './icon.svg';

interface IProps {
	achievement?: IAchievement;
	locked: boolean;
}

const achi: IAchievement = {
	id: 1,
	name: 'Hello World',
	description: 'Send your first message',
	image: 'jsp',
};

const Card = ({achievement, locked}: IProps) => {
	return (
		<S.Card locked={locked}>
			<Icon />
			<div className="vertical">
				<F.Text>{achi.name}</F.Text>
				<F.Subtitle>{achi.description}</F.Subtitle>
			</div>
			<S.State locked={locked}>{locked ? `Locked` : `Unlocked`}</S.State>
		</S.Card>
	);
};

export default Card;
