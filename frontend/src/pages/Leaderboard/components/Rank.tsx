import { Link } from "react-router-dom";
import { IUser } from "types/models";

interface IProps {
	player: IUser;
	rank: number;
}

const Rank = ({player, rank}: IProps) => {
	return (
	<Link to={`/dashboard/${player.id}`} className='leaderboard__slot'>
		<div className='leaderboard__slot__rank'>
			<li className='leaderboard__slot__rank-value'>#{rank}</li>
			<li className='leaderboard__slot__rank-sub subtitle'>Rank</li>
		</div>
		<div className='leaderboard__slot__player'>
			<img className='leaderboard__slot__player-avatar' src={player.image} />
			<div>
				<li className='leaderboard__slot__player-name'>{player.name}</li>
				<div className='leaderboard__slot__player__coalition'>
					<li className={`leaderboard__slot__player__coalition-value subtitle ${player.coalition}`}>{player.coalition}</li>
				</div>
			</div>
		</div>
		<div className='leaderboard__slot__score'>
			<li className='leaderboard__slot__score-value'>{player.score}</li>
			<li className='leaderboard__slot__score-sub subtitle'>Score</li>
		</div>
		<div className='leaderboard__slot__games'>
			<li className='leaderboard__slot__games-value value'>{player.games}</li>
			<li className='leaderboard__slot__games-sub subtitle'>Matches played</li>
		</div>
		<div className='leaderboard__slot__wins'>
			<li className='leaderboard__slot__wins-value value'>{player.wins}</li>
			<li className='leaderboard__slot__wins-sub subtitle'>Wins</li>
		</div>
		<div className='leaderboard__slot__ratio'>
			<li className='leaderboard__slot__ratio-value value'>{player.ratio}</li>
			<li className='leaderboard__slot__ratio-sub subtitle'>Ratio</li>
		</div>
		<div className='leaderboard__slot__achievements'>
			<li className='leaderboard__slot-achievements-value value'>{player.achievements.length}</li>
			<li className='leaderboard__slot-achievements-sub subtitle'>Achievements</li>
		</div>
	</Link>
	);
}

export default Rank;
