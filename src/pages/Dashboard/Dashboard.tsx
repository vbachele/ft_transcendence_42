import useFetchPlayer from 'hooks/useFetchPlayer';
import { Link, useParams } from 'react-router-dom';
import Player from './components/Player';
import './styles.css';

const Dashboard = () => {
	const id = parseInt(useParams().id!);
	const player = useFetchPlayer(id);

	return (
		<div>
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
		<Link to={`/dashboard/${id + 1}`}>next</Link>
		</div>
	);
}

export default Dashboard;
