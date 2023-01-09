import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading';
import Error from 'components/Error';
import RankList from './components/RankList';
import Empty from './components/Empty';
import { IUser } from 'types/models';
import './styles.css'

interface IUseFetch {
	data: IUser[];
	isLoading: boolean;
	error: string | null;
}

const Leaderboard = () => {
	const {data, isLoading, error}: IUseFetch = useFetch('http://localhost:8000/players');

	return (
		<div className='leaderboard'>
			<h1>Leaderboard</h1>
			{error && <Error text={error} /> }
			{isLoading && <Loading />}
			{data.filter(player => player.score > 0).length > 0 && <RankList players={data} />}
			{!error && 	!isLoading && data.filter(player => player.score > 0).length === 0 && <Empty /> }
		</div>
	);
}

export default Leaderboard;
