import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	height: 24px;

	.bell {
		cursor: pointer;
		user-select: none;
		border-radius: 0;
		fill: ${(p) => p.theme.colors.secondary};
		width: 24px;
		height: 24px;

		:hover {
			fill: #dc4f19;
		}
	}
`;

export const NotifCounter = styled.div`
	user-select: none;
	background-color: #dc4f19;
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

export const NotifCenterContainer = styled.div`
	background-color: rgb(0, 0, 0, 0.5);
	backdrop-filter: blur(16px);
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 8px;
	padding: 1em;
	width: max-content;
	right: 0;
	z-index: 50;

	display: flex;
	flex-direction: column;
	position: absolute;
	gap: 8px;

	button {
		margin: auto;
	}
`;

export const NotifsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	height: 100px;

	overflow-y: auto;
`;

export const Notif = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;

	.sender {
		display: flex;
		gap: 8px;
		font-weight: bold;
	}
`;

export const NotifLink = styled(Link)`
	color: ${(p) => p.theme.colors.secondary};
	display: flex;
	align-items: center;
`;
