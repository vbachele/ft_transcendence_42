import React, {useState} from 'react';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import {PrimaryButton} from 'styles/buttons.styles';
import {clearUsers} from './ClearUsers';
import {GenerateUsers} from './GenerateUsers';

const CSS = `
    .container {
        display: flex;
        flex-direction: column;
        margin: 96px auto;
        gap: 96px;
    }

    .button_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        gap: 24px;
        width: 60%;
    }

    .button_container > a {
        text-decoration: none;
    }

    .button_container > a > button {
        width: 100%;
    }
`;

export const UserMocks = () => {
	const {search} = useLocation();
	const match = search.match(/type=(.*)/);
	const type = match?.[1];

	function clear() {
		clearUsers();
		window.alert('User table cleared.');
	}

	return (
		<div className="container">
			<style>{CSS}</style>
			<h1>Dev tools to populate database</h1>
			<div className="button_container">
				<Link to="/users?type=generate">
					<PrimaryButton>Generate</PrimaryButton>
				</Link>
				<Link to="/users?type=clear">
					<PrimaryButton onClick={clear}>Clear</PrimaryButton>
				</Link>
			</div>
			{type === 'generate' && <GenerateUsers />}
		</div>
	);
};
