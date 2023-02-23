import styled, {css} from 'styled-components';

export const Container = styled.div`
	margin-top: -80px;
	grid-area: 3/1/3/3;
`;

export const Achievements = styled.div`
	margin-top: 48px;
	display: flex;
	flex-wrap: wrap;
	gap: 32px;
	justify-content: center;

	svg {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}
`;

interface IProps {
	unlocked: boolean;
}

// prettier-ignore
export const Card = styled.div<IProps>`
	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	display: flex;
	flex-direction: column;
	padding: 24px;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 24px;
	border-radius: 8px;
	width: 250px;

	.vertical {
		display: flex;
		flex-direction: column;
		gap: 8px;
		word-wrap: normal;
	}



	${(p) => p.theme.name === 'light' && css`
		.subtitle {
			color: #767676;
		}
	`}

	${(p) => !p.unlocked && css`
		svg, img {
			filter: grayscale(1);
		}
		color: white;
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#a9a9a9' : '#101010'};
	`}
`;

export const State = styled.div<IProps>`
	padding: 8px 12px;
	border-radius: 8px;
	text-align: center;

	background-color: ${(p) =>
		p.unlocked ? 'rgba(75, 174, 79, 0.2)' : 'rgba(224, 79, 95, 0.2)'};

	color: ${(p) => (p.unlocked ? '#44db4a' : '#fa394f')};
`;

export const Icon = styled.img`
	width: 48px;
	height: 48px;
`;
