import {Progress} from 'antd';
import styled from 'styled-components';

export const Stats = styled.div`
	display: flex;
	justify-content: space-between;
	grid-area: 1/1/2/2;

	@media screen and (max-width: 768px) {
		flex-direction: column;
		gap: 16px;
	}
`;

export const Card = styled.div`
	display: flex;
	align-items: center;
	padding: 16px;
	gap: 24px;
	width: 32%;
	border-radius: 8px;

	background-color: ${(p) => p.theme.colors.secondary};
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	svg {
		width: 48px;
		height: 48px;
	}

	@media screen and (max-width: 768px) {
		display: flex;
		width: 100%;

		svg {
			width: 32px;
			height: 32px;
		}
	}
`;

export const VDiv = styled.div`
	flex-direction: column;
	width: 45%;

	.ratio {
		display: none;
	}

	@media screen and (max-width: 1600px) {
		width: 100%;
		.ratio {
			display: block;
		}
	}
`;

export const StyledProgress = styled(Progress)`
	.ant-progress-text {
		font-weight: 600;
		color: ${(p) => p.theme.colors.text};
	}
	.ant-progress-bg {
		background-image: linear-gradient(
			to right,
			rgb(214, 59, 77) 0%,
			rgb(255, 191, 0) 100%
		);
	}
	.ant-progress-inner {
		background-color: ${(p) =>
			p.theme.name === 'light' ? '#cecece' : '#595959'};
	}

	@media screen and (max-width: 1600px) {
		display: none;
	}
`;
