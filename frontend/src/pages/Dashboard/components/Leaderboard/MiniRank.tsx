import {IUser} from 'types/models';
import * as S from './Leaderboard.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';

interface IProps {
	user: IUser;
	rank: string;
}

const MiniRank = ({user, rank}: IProps) => {
	return (
		<S.MiniRank to={`/dashboard/${user.name}`}>
			<F.H6>{rank}</F.H6>
			<S.User>
				<S.Avatar src={user.image} />
				<F.H6>{user.name}</F.H6>
			</S.User>
			<F.Text>{user.score} pts</F.Text>
		</S.MiniRank>
	);
};

export default MiniRank;
