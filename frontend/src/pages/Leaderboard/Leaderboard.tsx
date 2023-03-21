import {useUserInfos} from 'contexts/User/userContent';
import {useLocation} from 'react-router-dom';
import {Empty} from 'antd';
import useFetchUsers from 'hooks/useFetchUsers';
import RankList from './components/RankList';
import Loading from 'components/Loading';
import * as S from './Leaderboard.styles';
import * as F from 'styles/font.styles';

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
			{data && <RankList players={data} opt={option} />}
			{!error && !isLoading && data!.length === 0 && (
				<Empty className="empty" />
			)}
		</S.Container>
	);
};

export default Leaderboard;
