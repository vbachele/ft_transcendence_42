import Loading from 'components/Loading';
import useFetchUsers from 'hooks/useFetchUsers';
import { useLocation } from 'react-router-dom';
import * as F from 'styles/font.styles';
import Empty from './components/Empty';
import RankList from './components/RankList';
import * as S from './Leaderboard.styles';

const Leaderboard = () => {
	const {data, isLoading, error} = useFetchUsers();

	let location = useLocation();
	let option = new URLSearchParams(location.state).get('selectedOption');
	if (!option) option = 'All';

	return (
		<S.Container>
			<F.H1>Leaderboard</F.H1>
			{error && <div>Error</div>}
			{isLoading && <Loading />}
			{data && data!.filter((player) => player.score > 0).length > 0 && (
				<RankList players={data} opt={option} />
			)}
			{!error &&
				!isLoading &&
				data!.filter((player) => player.score > 0).length === 0 && <Empty />}
		</S.Container>
	);
};

export default Leaderboard;
