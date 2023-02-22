import styled, {css} from 'styled-components';

export const Container = styled.div`
	margin-top: -80px;
	grid-area: 3/1/3/3;
`;

export const Achievements = styled.div`
	margin-top: 48px;
	display: flex;
	flex-wrap: wrap;
	gap: 40px;
	justify-content: center;

	svg {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}
`;

interface IProps {
	locked: boolean;
}

// prettier-ignore
export const Card = styled.div<IProps>`
	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	display: flex;
	padding: 24px 48px;
	align-items: center;
	gap: 24px;
	border-radius: 8px;

	${(p) => p.locked && css`
		svg, img {
			filter: grayscale(1);
		}
		color: white;
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#3e3e3e' : '#101010'};
	`}
`;

export const State = styled.div<IProps>`
	padding: 8px 12px;
	border-radius: 8px;

	background-color: ${(p) =>
		p.locked ? 'rgba(224, 79, 95, 0.2)' : 'rgba(75, 174, 79, 0.2)'};

	color: ${(p) => (p.locked ? '#fa394f' : '#44db4a')};
`;
