import React, {useState} from 'react';
import {IUser} from 'types/models';
import {Input, Select} from 'antd';
import compareScore from 'helpers/compareScore';
import filterByName from 'helpers/filterByName';
import Rank from './Rank';
import * as S from '../Leaderboard.styles';
import * as F from 'styles/font.styles';

const {Search} = Input;

interface IProps {
	players: IUser[];
	opt: string;
}

const RankList = ({players, opt}: IProps) => {
	const [selectedCoalition, setSelectedCoalition] = useState(opt);
	const [search, setSearch] = useState('');

	const handleCoalitionChange = (value: string) => {
		setSelectedCoalition(value);
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
						width: 200,
						alignSelf: 'center',
					}}
					enterButton
				/>
				<Select
					defaultValue={opt}
					size="large"
					style={{
						width: 150,
						alignSelf: 'center',
						textAlign: 'left',
					}}
					onChange={handleCoalitionChange}
					options={[
						{value: 'All', label: 'All Coalitions'},
						{value: 'Federation', label: 'Federation'},
						{value: 'Alliance', label: 'Alliance'},
						{value: 'Order', label: 'Order'},
						{value: 'Assembly', label: 'Assembly'},
					]}
				/>
				<F.Text className="player-count">
					{players.filter(filterCoalition).length} player(s)
				</F.Text>
			</S.FiltersContainer>

			{players
				.sort(compareScore)
				.filter(filterCoalition)
				.filter((player) => filterByName(player, search))
				.map((player: IUser) => (
					<Rank
						player={player}
						rank={players.filter(filterCoalition).indexOf(player) + 1}
						key={player.name}
					/>
				))}
		</>
	);
};

export default RankList;
