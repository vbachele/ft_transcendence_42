import styled, {css} from 'styled-components';

export const Container = styled.div`
	margin-top: -128px;
	grid-area: 3/1/3/3;

	@media screen and (max-width: 1280px) {
		margin-top: 0;
	}
`;

export const Achievements = styled.div`
	margin-top: 48px;
	display: flex;
	flex-wrap: wrap;
	gap: 32px;
	justify-content: center;

	@media screen and (max-width: 768px) {
		gap: 16px;
	}
`;

interface IProps {
	unlocked: boolean;
}

export const Card = styled.div<IProps>`
	background-color: ${(p) => p.theme.colors.secondary};
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

	${(p) =>
		p.theme.name === 'light' &&
		css`
			.subtitle {
				color: #767676;
			}
		`}

	${(p) =>
		!p.unlocked &&
		css`
			svg,
			img {
				filter: grayscale(1);
			}
			color: white;
			background-color: ${(p) =>
				p.theme.name === 'light' ? '#a7a7a7' : '#151515'};
		`}

	@media screen and (max-width: 768px) {
		width: 128px;

		.title {
			font-size: 16px;
		}
		.subtitle {
			font-size: 12px;
		}
	}
`;

export const State = styled.div<IProps>`
	font-weight: 500;
	padding: 8px 12px;
	border-radius: 8px;
	text-align: center;

	background-color: ${(p) =>
		p.unlocked ? 'rgba(75, 174, 79, 0.15)' : 'rgba(224, 79, 95, 0.15)'};

	color: ${(p) => (p.unlocked ? '#80db69' : '#fa394f')};

	@media screen and (max-width: 768px) {
		font-size: 12px;
		padding: 8px;
	}
`;

export const Icon = styled.img`
	width: 48px;
	height: 48px;

	@media screen and (max-width: 768px) {
		width: 32px;
		height: 32px;
	}
`;
