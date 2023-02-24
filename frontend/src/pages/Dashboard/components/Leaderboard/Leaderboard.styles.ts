import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Leaderboard = styled.div`
	grid-area: 1/2/3/3;
	position: relative;
	top: -150px;

	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 8px;

	display: flex;
	flex-direction: column;
	gap: 32px;
	padding: 16px 20px;
	text-align: center;

	@media screen and (max-width: 1280px) {
		top: 0;
		padding: 16px 20px 64px 20px;

		.subcontainer {
			display: flex;
			justify-content: space-around;
		}
	}

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const FirstPlayer = styled(Link)`
	text-decoration: none;
	color: ${(p) => p.theme.colors.secondary};
	justify-content: center;
	display: flex;
	flex-direction: column;
	gap: 8px;

	img {
		align-self: center;
		margin: 16px 0;
		width: 128px;
		height: 128px;
		border-radius: 50%;

		box-shadow: 0 0 10px #ffbf00, 0 0 20px #ffbf00, 0 0 40px #ffbf00;
	}
`;

export const TopFive = styled.div`
	justify-content: center;
	margin-top: 24px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const MiniRank = styled(Link)`
	background-color: ${(p) =>
		p.theme.name === 'light' ? '#ececee' : '#1c1c1d'};
	color: ${(p) => p.theme.colors.secondary};
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 8px 12px;
	border-radius: 8px;

	@media screen and (max-width: 1600px) {
		.score {
			display: none;
		}
	}

	@media screen and (max-width: 1280px) {
		.score {
			display: block;
		}
	}
`;

export const Avatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
`;

export const User = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	width: 50%;
	word-break: break-all;

	@media screen and (max-width: 1600px) {
		width: 70%;
	}
`;
