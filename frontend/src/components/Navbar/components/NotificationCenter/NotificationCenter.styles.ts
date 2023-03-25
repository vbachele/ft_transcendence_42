import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	height: 24px;

	h4 {
		margin: 0 auto;
	}

	.bell {
		cursor: pointer;
		user-select: none;
		border-radius: 0;
		fill: ${(p) => p.theme.colors.text};
		width: 24px;
		height: 24px;

		:hover {
			fill: ${(p) => p.theme.colors.main};
		}
	}
`;

export const NotifCounter = styled.div`
	user-select: none;
	background-color: ${(p) => p.theme.colors.main};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	position: absolute;
	top: -8px;
	left: -8px;
	padding: 10px;
	border-radius: 50%;
	font-size: 16px;
	font-weight: 500;
	color: white;
	z-index: 50;

	@media screen and (max-width: 768px) {
		top: -4px;
	}
`;

export const NotifCenterPanel = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0;
	width: max-content;
	gap: 10px;
	border-radius: 8px;
	color: white;
	background-color: #151515;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	z-index: 50;

	button {
		margin: 16px auto;
		background: none;
		border: none;
		font-size: 16px;
		color: white;
		font-weight: 500;
		cursor: pointer;

		:hover {
			text-decoration: underline;
		}
	}

	.top-button {
		display: none;
	}

	@media screen and (max-width: 768px) {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		border-radius: 0;
		z-index: 65;

		.top-button {
			display: block;
		}
		.bottom-button {
			display: none;
		}
	}
`;

export const NotifsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 1em;
	max-height: 50vh;
	overflow-y: auto;

	@media screen and (max-width: 768px) {
		max-height: max-content;
		margin: 0 10%;
	}
`;

export const Notif = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	justify-content: space-between;

	p {
		color: white;
	}
`;

export const NotifLink = styled(Link)`
	display: flex;
	align-items: center;
	color: white;

	img {
		width: 40px;
		height: 40px;
	}
`;

export const SmallScreenButtons = styled.div`
	display: none;
	flex-direction: row;

	.close {
		position: fixed;
		top: 8px;
		right: 16px;
		margin: 0;

		svg {
			fill: white;
			width: 30px;
			height: 30px;
		}
	}

	@media screen and (max-width: 768px) {
		display: flex;
	}
`;

export const Title = styled.div`
	background-color: ${(p) => p.theme.colors.main};
	display: flex;
	height: 48px;
	text-align: center;
	align-items: center;
	border-radius: 8px 8px 0 0;

	@media screen and (max-width: 768px) {
		background-color: #202020;
		border-bottom: 1px solid white;
		display: flex;
		border-radius: 0;
	}
`;
