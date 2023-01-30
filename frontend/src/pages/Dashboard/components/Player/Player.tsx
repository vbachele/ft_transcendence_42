import {Link} from 'react-router-dom';
import getRanks from 'helpers/getRanks';
import ActivityStatus from 'components/ActivityStatus';
import {IUser} from 'types/models';
import {Progress} from 'antd';
import * as S from './Player.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';

interface IProps {
	player: IUser;
}

const DashboardPlayer = ({player}: IProps) => {
	// const {globalRank, coalitionRank} = getRanks(player);

	return (
		<div className="subcontainer">
			<S.Coalition>
				<Link to="/leaderboard" state={{selectedOption: player.coalition}}>
					<F.H4>The {player.coalition}</F.H4>
					<S.Flag src={`/src/assets/${player.coalition.toLowerCase()}.svg`} />
				</Link>
				<S.Ranks>
					<Link to="/leaderboard" state={{selectedOption: 'All'}}>
						<F.H4>{`#54`}</F.H4>
						<F.Subtitle>Global</F.Subtitle>
					</Link>
					<Link to="/leaderboard" state={{selectedOption: player.coalition}}>
						<F.H4>{`#12`}</F.H4>
						<F.Subtitle>Coalition</F.Subtitle>
					</Link>
				</S.Ranks>
			</S.Coalition>
			<S.Profile>
				<S.User>
					<S.Avatar src={player.image} />
					<div>
						<F.H3>{player.name}</F.H3>
						<ActivityStatus state={'ingame'} />
					</div>
				</S.User>
				<div style={{fontWeight: 700}}>
					<Progress
						type="circle"
						width={120}
						strokeColor={'#e04f5f'}
						trailColor={'#bbbbbb'}
						strokeLinecap="butt"
						strokeWidth={8}
						percent={Math.floor(player.ratio * 100)}
						format={(percent) => `${percent}%`}
						success={{percent: 0, strokeColor: '#000'}}
					/>
				</div>
			</S.Profile>
			<S.Options>
				<UI.SecondaryButtonSmall>View profile</UI.SecondaryButtonSmall>
			</S.Options>
			<S.Stats>
				<div>
					<F.H4>{player.games}</F.H4>
					<F.Subtitle>Games Played</F.Subtitle>
				</div>
				<div>
					<F.H4>{player.wins}</F.H4>
					<F.Subtitle>Wins</F.Subtitle>
				</div>
				<div>
					<F.H4>{player.achievements.length}</F.H4>
					<F.Subtitle>Achievements</F.Subtitle>
				</div>
			</S.Stats>
		</div>
	);
};

export default DashboardPlayer;
