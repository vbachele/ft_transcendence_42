import styled from 'styled-components';

export const Container = styled.div`
	grid-area: 2/1/3/2;
`;

export const History = styled.div`
	margin-top: 16px;
	display: flex;
	justify-content: space-between;
`;

export const Card = styled.div`
	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 8px;
	width: 15%;
	height: 300px;
`;
