import {IUser} from 'types/models';
import * as S from './Achievements.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import Card from './Card';

interface IProps {
	user: IUser;
}

const Achievements = ({user}: IProps) => {
	return (
		<S.Container>
			<F.Subtitle weight="700" fontSize="30px">
				Achievements - {user.achievements.length} / 11
			</F.Subtitle>
			<S.Achievements>
				<Card locked={false} />
				<Card locked={false} />
				<Card locked={false} />
				<Card locked={true} />
				<Card locked={true} />
				<Card locked={true} />
				<Card locked={false} />
				{/* {user.achievements.map((achievement) => (
					<Card key={user.achievements.indexOf(achievement)} />
				))} */}
			</S.Achievements>
		</S.Container>
	);
};

export default Achievements;
