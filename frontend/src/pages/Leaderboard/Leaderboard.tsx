import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading';
import Error from 'components/Error';
import RankList from './components/RankList';
import Empty from './components/Empty';
import {IUser} from 'types/models';
import {useLocation} from 'react-router-dom';
import * as S from './Leaderboard.styles';
import * as F from 'styles/font.styles';
import UserList from 'mocks/Users/players.json';

const Leaderboard = () => {
	let data: IUser[] = [];

	for (let value in UserList.players) {
		data.push(UserList.players[value]);
	}

	let location = useLocation();
	let option = new URLSearchParams(location.state).get('selectedOption');
	if (!option) option = 'All';

	return (
		<S.Container>
			<F.H1>Leaderboard</F.H1>
			{/* {error && <Error text={'error'} />}
			{isLoading && <Loading />} */}
			{data && data!.filter((player) => player.score > 0).length > 0 && (
				<RankList players={data} opt={option} />
			)}
			{/* {!error &&
				!isLoading &&
				data!.filter((player) => player.score > 0).length === 0 && <Empty />} */}
		</S.Container>
	);
};

export default Leaderboard;
