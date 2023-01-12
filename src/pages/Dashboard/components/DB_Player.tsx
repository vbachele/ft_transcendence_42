import getRanks from 'helpers/getRanks';
import { useEffect } from 'react';
import { IUser } from 'types/models';

interface IProps {
	player: IUser;
}

const DashboardPlayer = ({player}: IProps) => {
	const { globalRank, coalitionRank } = getRanks(player);

	return (
		<div className='db__player subcontainer'>
			<div className='db__player__coa'>
				<h4>The {player.coalition}</h4>
				<img src={`/src/assets/${player.coalition.toLowerCase()}.svg`} />
				<div className='db__player__coa__ranks'>
					<div className='db__player__coa__ranks-global'>
						<h4>{`#${globalRank}`}</h4>
						<p className='subtitle'>Global</p>
					</div>
					<div className='db__player__coa__ranks-coa'>
						<h4>{`#${coalitionRank}`}</h4>
						<p className='subtitle'>Coalition</p>
					</div>
				</div>
			</div>
			<div className='db__player__ratio'>
				<h3>{player.name}</h3>
			</div>
			<div className='db__player__options'>
			</div>
			<div className='db__player__stats'>
			</div>
		</div>
	);
}

export default DashboardPlayer;
