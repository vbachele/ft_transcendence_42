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

    td, th {
        min-width: 122px; 
        height: 48px;
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

	return (
		<div style={{justifyContent: 'center', margin: '48px auto'}}>
			<style>{CSS}</style>
			<table>
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
		</div>
	);
};
