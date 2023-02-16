import {Link} from 'react-router-dom';
import {IUser} from 'types/models';

import * as S from '../Leaderboard.styles';
import * as F from 'styles/font.styles';

interface IProps {
	player: IUser;
	rank: number;
}

const Rank = ({player, rank}: IProps) => {
	return (
		<S.Slot to={`/dashboard/${player.name}`}>
			<S.Stat className="rank">
				<F.Text>#{rank}</F.Text>
				<F.Subtitle className="rank-subtitle">Rank</F.Subtitle>
			</S.Stat>
			<S.Profile>
				<img className="avatar" src={player.image} />
				<S.Stat className="name-coalition">
					<F.Text>{player.name}</F.Text>
					<F.Subtitle weight="600" className={`${player.coalition}`}>
						{player.coalition}
					</F.Subtitle>
				</S.Stat>
			</S.Profile>
			<S.Stat className="score">
				<F.Text>{player.score}</F.Text>
				<F.Subtitle>Score</F.Subtitle>
			</S.Stat>
			<S.Stat className="games">
				<F.Text>{player.games}</F.Text>
				<F.Subtitle>Matches Played</F.Subtitle>
			</S.Stat>
			<S.Stat className="wins">
				<F.Text>{player.wins}</F.Text>
				<F.Subtitle>Wins</F.Subtitle>
			</S.Stat>
			<S.Stat className="ratio">
				<F.Text>{player.ratio}</F.Text>
				<F.Subtitle>Ratio</F.Subtitle>
			</S.Stat>
			<S.Stat className="achievements">
				<F.Text>{player.achievements.length}</F.Text>
				<F.Subtitle>Achievements</F.Subtitle>
			</S.Stat>
		</S.Slot>
	);
};

export default Rank;
