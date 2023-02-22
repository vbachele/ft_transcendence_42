import styled from 'styled-components';

export const Container = styled.div`
	grid-area: 2/1/3/2;
	margin-top: 16px;
`;

export const History = styled.div`
	margin-top: 48px;
	display: flex;
	justify-content: space-between;
`;

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;

	svg {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
`;

interface ICardProps {
	result: string;
}

export const Card = styled.div<ICardProps>`
	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};
	box-shadow: ${(p) =>
		p.result === 'win'
			? 'rgba(75, 174, 79, 1) 0px 0px 8px'
			: 'rgba(224, 79, 95, 1) 0px 0px 8px'};
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 32px 0;
	gap: 24px;
	border-radius: 8px;
	width: 192px;
	height: 300px;

	img {
		border-radius: 50%;
		width: 128px;
		height: 128px;
	}
`;

export const Result = styled.div`
	display: flex;
`;
