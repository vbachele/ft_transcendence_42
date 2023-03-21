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
	z-index: 70;

	@media screen and (max-width: 768px) {
		top: -4px;
	}
`;

export const PanelContainer = styled.div`
	background-color: #888;
	border-radius: 8px;
	padding: 8px;
	width: max-content;
	position: absolute;
	right: 0;
	z-index: 50;

	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const NotifContainer = styled(Link)`
	/* border: 1px solid crimson; */
	/* a { */
	text-decoration: none;
	color: black;
	/* } */
`;
