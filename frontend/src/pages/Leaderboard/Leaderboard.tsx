import useFetch from 'hooks/useFetch';
import RankList from './components/RankList';
import Empty from './components/Empty';
import {useLocation} from 'react-router-dom';
import useFetchAllUsers from 'hooks/useFetchAllUsers';
import * as S from './Leaderboard.styles';
import * as F from 'styles/font.styles';

const Leaderboard = () => {
	const {data, isLoading, error} = useFetchAllUsers();

	let location = useLocation();
	let option = new URLSearchParams(location.state).get('selectedOption');
	if (!option) option = 'All';

	return (
		<S.Container>
			<F.H1>Leaderboard</F.H1>
			{error && <div>Error</div>}
			{isLoading && <div>Loading...</div>}
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
