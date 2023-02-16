import {Link, useParams} from 'react-router-dom';
import {IUser} from 'types/models';
import Player from './components/Player';
import avatar from 'assets/default-avatar.png';
import * as S from './Dashboard.styles';
import * as F from 'styles/font.styles';
import useFetchUserByName from 'hooks/useFetchUserByName';
import NotFound from 'pages/NotFound/NotFound';
import Loading from 'components/Loading';

// const player: IUser = {
// 	name: 'Louis',
// 	image: avatar,
// 	coalition: 'Alliance',
// 	status: 'ingame',
// 	score: 987987,
// 	games: 564,
// 	wins: 321,
// 	ratio: 0.54,
// 	achievements: ['achievement 1', 'achievement 2', 'achievement 3'],
// 	id: 5,
// };

const Dashboard = () => {
	const name = useParams().name!;
	const {data, isLoading, error} = useFetchUserByName(name);

	return (
		<>
			{error && <NotFound />}
			{isLoading && <Loading />}
			{data && (
				<S.DashboardGrid>
					<Player player={data} />
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
			)}
		</>
	);
};

export default Dashboard;
