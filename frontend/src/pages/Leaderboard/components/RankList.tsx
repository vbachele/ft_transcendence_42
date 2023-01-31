import React from 'react';
import {useState} from 'react';
import Rank from './Rank';
import {IUser} from 'types/models';
import compareScore from 'helpers/compareScore';

import * as S from '../Leaderboard.styles';
import * as F from 'styles/font.styles';
import {Input} from 'antd';

interface IProps {
	players: IUser[];
	opt: string;
}

const {Search} = Input;

const RankList = ({players, opt}: IProps) => {
	const [selectedCoalition, setSelectedCoalition] = useState(opt);
	const [search, setSearch] = useState('');

	const handleCoalitionChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedCoalition(event.target.value);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const filterCoalition = (player: IUser): boolean => {
		return (
			selectedCoalition === 'All' || player.coalition === selectedCoalition
		);
	};

	return (
		<>
			<S.FiltersContainer>
				<Search
					placeholder="Search a player"
					size="large"
					onChange={handleSearchChange}
					style={{
						width: '250px',
						alignSelf: 'center',
					}}
					enterButton
				/>
				<S.SearchCoalition onChange={handleCoalitionChange} defaultValue={opt}>
					<option value="All">All Coalitions</option>
					<option value="Federation">Federation</option>
					<option value="Order">Order</option>
					<option value="Assembly">Assembly</option>
					<option value="Alliance">Alliance</option>
				</S.SearchCoalition>
				<F.Text className="player-count">
					{players.filter(filterCoalition).length} player(s)
				</F.Text>
			</S.FiltersContainer>

			{players
				.sort(compareScore)
				.filter(filterCoalition)
				.filter((player) =>
					player.name
						.normalize('NFD')
						.toLowerCase()
						.includes(search.normalize('NFD').toLowerCase())
				)
				.map((player: IUser) => (
					<Rank
						player={player}
						rank={players.filter(filterCoalition).indexOf(player) + 1}
						key={player.id}
					/>
				))}
		</>
	);
};

export default RankList;
