import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Leaderboard = styled.div`
	grid-area: 1/2/3/3;
	position: relative;
	top: -150px;

	background-color: ${(p) => p.theme.colors.secondary};
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 8px;

	display: flex;
	flex-direction: column;
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
	color: ${(p) => p.theme.colors.text};
`;

export const Crown = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	svg {
		position: relative;
		top: 32px;
		left: 24px;
		transform: rotate(17deg);
		width: 64px;
		height: 64px;
	}

	img {
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		margin: 16px 0;
		width: 128px;
		height: 128px;
		border-radius: 50%;
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
	background-color: ${(p) => p.theme.colors.third};
	color: ${(p) => p.theme.colors.text};
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

	:hover {
		background-color: ${(p) => p.theme.colors.hover};
	}
`;

export const Avatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
