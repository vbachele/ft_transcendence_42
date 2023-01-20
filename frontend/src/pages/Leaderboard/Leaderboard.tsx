import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading';
import Error from 'components/Error';
import RankList from './components/RankList';
import Empty from './components/Empty';
import {IUser} from 'types/models';
import {useLocation} from 'react-router-dom';
import './styles.css';

const Leaderboard = () => {
	const {data, isLoading, error} = useFetch<IUser[]>(
		'http://backend:3000/players'
	);
	let location = useLocation();
	let option = new URLSearchParams(location.state).get('selectedOption');

	if (!option) option = 'All';

	return (
		<div className="leaderboard">
			<h1>Leaderboard</h1>
			{error && <Error text={'error'} />}
			{isLoading && <Loading />}
			{data && data!.filter((player) => player.score > 0).length > 0 && (
				<RankList players={data} opt={option} />
			)}
			{!error &&
				!isLoading &&
				data!.filter((player) => player.score > 0).length === 0 && <Empty />}
		</div>
	);
};

export default Leaderboard;
