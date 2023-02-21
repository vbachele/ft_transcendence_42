import {IUser} from 'types/models';
import * as S from './Achievements.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';

interface IProps {
	user: IUser;
}

const Achievements = ({user}: IProps) => {
	return (
		<S.Achievements>
			<F.H1>Achievements</F.H1>
		</S.Achievements>
	);
};

export default Achievements;
