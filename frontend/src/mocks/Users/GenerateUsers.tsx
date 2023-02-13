import {api} from 'lib/api';
import React, {useEffect} from 'react';
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
		<tr>
			<td>{value.id}</td>
			<td>{value.name}</td>
			<td>{value.coalition}</td>
			<td>{value.games}</td>
			<td>{value.wins}</td>
			<td>{value.ratio}</td>
		</tr>
	));

	api.post('/users/generate', users);

	return (
		// <div className='table_container'>
		<table>
			<style>{CSS}</style>
			<tr>
				<th>ID</th>
				<th>NAME</th>
				<th>COALITION</th>
				<th>GAMES</th>
				<th>WINS</th>
				<th>RATIO</th>
			</tr>
			{userList}
		</table>
		// </div>
	);
};
