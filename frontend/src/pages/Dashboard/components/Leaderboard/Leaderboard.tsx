import {IUser} from 'types/models';
import * as S from './Leaderboard.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import useFetchUsers from 'hooks/useFetchUsers';
import compareScore from 'helpers/compareScore';
import MiniRank from './MiniRank';

interface IProps {
	user: IUser;
}

const Leaderboard = ({user}: IProps) => {
	const {data, isLoading, error} = useFetchUsers();
	if (data) {
		data.sort(compareScore);
	}

	return (
		<S.Leaderboard>
			<F.Subtitle weight="700" fontSize="30px" style={{textAlign: 'left'}}>
				Leaderboard
			</F.Subtitle>
			<F.H4>Best Player</F.H4>
			{data && (
				<S.FirstPlayer to={`/dashboard/${data[0].name}`}>
					<img src={data[0].image} />
					<F.H4>{data[0].name}</F.H4>
					<F.Text>{data[0].score} points</F.Text>
				</S.FirstPlayer>
			)}
			{data && (
				<S.TopFive>
					<MiniRank user={data[1]} rank="2nd" />
					<MiniRank user={data[2]} rank="3rd" />
					<MiniRank user={data[3]} rank="4th" />
					<MiniRank user={data[4]} rank="5th" />
				</S.TopFive>
			)}
		</S.Leaderboard>
	);
};

export default Leaderboard;
