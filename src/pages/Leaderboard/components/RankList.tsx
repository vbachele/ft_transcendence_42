import { useState } from "react";
import Rank from "./Rank";
import { IUser } from "types/models";
import compareScore from "helpers/compareScore";
import React from "react";

interface IProps {
	players: IUser[];
	opt: string;
}

const RankList = ({players, opt}: IProps) => {
	const [selectedCoalition, setSelectedCoalition] = useState(opt);
	const [search, setSearch] = useState("");

	const handleCoalitionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCoalition(event.target.value);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const filterCoalition = (player: IUser): boolean => {
		return (selectedCoalition === 'All' || player.coalition === selectedCoalition);
	}

	return (
		<div className="rankList">
			{/* convert to component */}
			<div className="rankList__search">
				<input
					placeholder='Search a player'
					id='search'
					onInput={handleSearchChange}
					className='rankList__search__name'
				/>
				<select
					name="coalitions"
					id="coalition"
					onChange={handleCoalitionChange}
					defaultValue={opt}
					className="rankList__search__coalition"
				>
					<option value="All">All Coalitions</option>
					<option value="Federation">Federation</option>
					<option value="Order">Order</option>
					<option value="Assembly">Assembly</option>
					<option value="Alliance">Alliance</option>
				</select>
				<p className="rankList__search__count">
					{players
						.filter(filterCoalition).length} player(s)
				</p>
			</div>

			{players
				.sort(compareScore)
				.filter(filterCoalition)
				.filter((player) =>
					player.name
						.normalize("NFD")
						.toLowerCase()
						.includes(search.normalize("NFD").toLowerCase()))
				.map((player: IUser) => (
					<Rank
						player={player}
						rank={players.filter(filterCoalition).indexOf(player) + 1}
						key={player.id}
					/>
				))}
		</div>
	);
}

export default RankList;
