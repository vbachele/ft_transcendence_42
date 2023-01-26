import {Link, useParams} from 'react-router-dom';
import {IUser} from 'types/models';
import Player from './components/Player';
import avatar from 'assets/default-avatar.png';
import * as S from './Dashboard.styles';
import * as F from 'styles/font.styles';

const Dashboard = () => {
	// gets id from link to display the right player
	const id = parseInt(useParams().id!);

	const player: IUser = {
		name: 'Louis',
		image: avatar,
		coalition: 'Alliance',
		score: 987987,
		games: 564,
		wins: 321,
		ratio: 0.54,
		achievements: ['achievement 1', 'achievement 2', 'achievement 3'],
		id: 5,
	};

	return (
		<>
			<S.DashboardGrid>
				<Player player={player} />
				<div className="subcontainer">
					<F.H3>Top players (coa and global)</F.H3>
				</div>
				<div className="subcontainer">
					<F.H3>History</F.H3>
				</div>
				<div className="subcontainer">
					<F.H3>Achievements</F.H3>
				</div>
			</S.DashboardGrid>
			<Link to={`/dashboard/${id + 1}`}>next player</Link>
		</>
	);
};

export default Dashboard;
