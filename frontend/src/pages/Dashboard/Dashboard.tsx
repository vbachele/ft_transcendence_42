import {useParams} from 'react-router-dom';
import useFetchUserByName from 'hooks/useFetchUserByName';
import NotFound from 'pages/NotFound/NotFound';
import Loading from 'components/Loading';
import Profile from './components/Profile';
import Stats from './components/Stats';
import Leaderboard from './components/Leaderboard';
import History from './components/History';
import Achievements from './components/Achievements';
import * as S from './Dashboard.styles';
import * as F from 'styles/font.styles';

const Dashboard = () => {
	const name = useParams().name!;
	const {data, isLoading, error} = useFetchUserByName(name);

	return (
		<>
			{error && <div>Error</div>}
			{isLoading && <Loading />}
			{data && (
				<S.Container>
					<Profile user={data} />
					<S.SubContainer>
						<Stats user={data} />
						<Leaderboard user={data} />
						<History />
					</S.SubContainer>
					<Achievements user={data} />
				</S.Container>
			)}
		</>
	);
};

export default Dashboard;
