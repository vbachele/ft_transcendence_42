import useFetchPlayer from 'hooks/useFetchPlayer';
import { useParams } from 'react-router-dom';
import Player from './components/DB_Player';
import './styles.css';

const Dashboard = () => {
	const id = parseInt(useParams().id!);
	const player = useFetchPlayer(id);

	return (
		<div className='dashboard'>
			<Player player={player} />
			<div className='dashboard__top subcontainer'>
				Top 3
			</div>
			<div className='dashboard__history subcontainer'>
				History
			</div>
			<div className='dashboard__achievements subcontainer'>
				Achievements
			</div>
		</div>
	);
}

export default Dashboard;
