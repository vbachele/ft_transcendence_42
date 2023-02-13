import {api} from 'lib/api';
import React, {useEffect} from 'react';
import {useAsyncValue} from 'react-router-dom';
import {IUser} from 'types/models';
import UserList from './players.json';

const CSS = `

    table, td, th {
        border: 1px solid;
        border-collapse: collapse;
        text-align: center;
    }

	table {
		width: 100%;
	}

    td, th {
        height: 32px;
    }

	tr:nth-child(odd) {
		background-color: lightgrey;
	}
`;

export const GenerateUsers = () => {
	let users: IUser[] = [];

	for (let value in UserList.players) {
		users.push(UserList.players[value]);
	}

	const userList = users.map((value) => (
		<tr key={value.id}>
			<td key={0}>{value.id}</td>
			<td key={1}>{value.name}</td>
			<td key={2}>{value.coalition}</td>
			<td key={3}>{value.games}</td>
			<td key={4}>{value.wins}</td>
			<td key={5}>{value.ratio}</td>
		</tr>
	));

	api.post('/users/generate', users);

	return (
		// <div className='table_container'>
		<table>
			<style>{CSS}</style>
			<thead>
				<tr>
					<th key="id">ID</th>
					<th key="name">NAME</th>
					<th key="coalition">COALITION</th>
					<th key="games">GAMES</th>
					<th key="wins">WINS</th>
					<th key="ratio">RATIO</th>
				</tr>
			</thead>
			<tbody>{userList}</tbody>
		</table>
		// </div>
	);
};
