import {IUser} from 'types/models';
import * as S from './Leaderboard.styles';
import * as F from 'styles/font.styles';
import {ReactComponent as Crown} from '../../assets/crown.svg';
import useFetchUsers from 'hooks/useFetchUsers';
import compareScore from 'helpers/compareScore';
import MiniRank from './MiniRank';

interface IProps {
	user: IUser;
}

const Leaderboard = ({user}: IProps) => {
	let {data, isLoading, error} = useFetchUsers(); //TODO ajouter userName.userName
	if (data) {
		data.sort(compareScore);
	}

	return (
		<S.Leaderboard>
			<F.Subtitle weight="700" fontSize="30px" style={{textAlign: 'left'}}>
				Best Players
			</F.Subtitle>
			<div className="subcontainer">
				{isLoading && <F.Text>Loading ...</F.Text>}
				{error && <F.Text>Error</F.Text>}
				{data && (
					<S.FirstPlayer to={`/dashboard/${data[0].name}`}>
						{/* <F.H4>Best Player</F.H4> */}
						<S.Crown>
							<Crown />
							<img src={data[0].image} />
						</S.Crown>
						<F.H4>{data[0].name}</F.H4>
						<F.Text>{data[0].score} points</F.Text>
					</S.FirstPlayer>
				)}
				{data && (
					<S.TopFive>
						{data[1] && <MiniRank user={data[1]} rank="2nd" />}
						{data[2] && <MiniRank user={data[2]} rank="3rd" />}
						{data[3] && <MiniRank user={data[3]} rank="4th" />}
						{data[4] && <MiniRank user={data[4]} rank="5th" />}
					</S.TopFive>
				)}
			</div>
		</S.Leaderboard>
	);
};

export default Leaderboard;
