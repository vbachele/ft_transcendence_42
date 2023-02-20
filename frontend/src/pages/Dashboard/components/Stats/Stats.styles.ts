import {Progress} from 'antd';
import styled from 'styled-components';

export const Stats = styled.div`
	display: flex;
	justify-content: space-between;
	grid-area: 1/1/2/2;
`;

export const Card = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;

	width: 30%;
	border-radius: 8px;

	padding: 16px;

	background-color: ${(p) =>
		p.theme.name === 'light' ? '#f6f6f7' : '#252526'};

	svg {
		width: 64px;
		height: 64px;
	}

	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const VDiv = styled.div`
	flex-direction: column;
	width: 50%;
`;

export const StyledProgress = styled(Progress)`
	.ant-progress-text {
		font-weight: 600;
		color: ${(p) => p.theme.colors.secondary};
	}
	.ant-progress-bg {
		background-image: linear-gradient(
			to right,
			rgb(214, 59, 77) 0%,
			rgb(255, 191, 0) 100%
		);
	}
	.ant-progress-inner {
		background-color: #f8dde15e;
	}
`;
