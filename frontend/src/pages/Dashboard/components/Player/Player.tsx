import {Link} from 'react-router-dom';
import getRanks from 'helpers/getRanks';
import {IUser} from 'types/models';
import {Progress} from 'antd';
import './styles.css';

interface IProps {
	player: IUser;
}

const DashboardPlayer = ({player}: IProps) => {
	const {globalRank, coalitionRank} = getRanks(player);

	return (
		<div className="db__player subcontainer">
			<div className="db__player__coa">
				<Link
					to="/leaderboard"
					state={{selectedOption: player.coalition, rank: coalitionRank}}
				>
					<h4 className="db__player__coa-name">The {player.coalition}</h4>
					<img
						className="db__player__coa-flag"
						src={`/src/assets/${player.coalition.toLowerCase()}.svg`}
					/>
				</Link>
				<div className="db__player__coa__ranks">
					<Link
						to="/leaderboard"
						state={{selectedOption: 'All', rank: coalitionRank}}
					>
						<div className="db__player__coa__ranks-global">
							<h4>{`#${globalRank}`}</h4>
							<p className="subtitle">Global</p>
						</div>
					</Link>
					<Link
						to="/leaderboard"
						state={{selectedOption: player.coalition, rank: coalitionRank}}
					>
						<div className="db__player__coa__ranks-coa">
							<h4>{`#${coalitionRank}`}</h4>
							<p className="subtitle">Coalition</p>
						</div>
					</Link>
				</div>
			</div>
			<div className="db__player__profile">
				<div className="db__player__profile__user">
					<img
						className="db__player__profile__user-avatar"
						src={player.image}
					/>
					<div className="db__player__profile__user__name">
						<h3>{player.name}</h3>
						<div className="db__player__profile__user__name-status">
							<span></span>
							<h5>Online</h5>
						</div>
					</div>
				</div>
				<div
					className="db__player__profile__user-ratio"
					style={{fontWeight: 700}}
				>
					<Progress
						type="circle"
						width={120}
						strokeColor={'#e04f60'}
						strokeWidth={7}
						percent={Math.floor(player.ratio * 100)}
						format={(percent) => `${percent}%`}
						success={{percent: 0, strokeColor: '#000'}}
					/>
				</div>
			</div>
			<div className="db__player__options">
				<button>View Profile</button>
			</div>
			<div className="db__player__stats">
				<div className="Games Played">
					<h5>Games Played</h5>
					<h3>{player.games}</h3>
				</div>
				<div className="Wins">
					<h5>Wins</h5>
					<h3>{player.wins}</h3>
				</div>
				<div className="Achievements">
					<h5>Achievements</h5>
					<h3>{player.achievements.length}</h3>
				</div>
			</div>
		</div>
	);
};

export default DashboardPlayer;
