import styled from 'styled-components';
import {StateEnum} from 'types/models';

interface IProps {
	state: string;
}

// prettier-ignore
export const Status = styled.div<IProps>`
	display: flex;
	align-items: center;
	gap: 5px;

	span {
		background-color: ${(p) =>
		p.state === "online" ? '#4bae4f'
			: p.state === "ingame" ? '#fa8c16'
			: p.state === "offline" ? '#9ca3af'
			: '#000'};
		height: 10px;
		width: 10px;
		border-radius: 50%;
	}

	p {
		color: ${(p) =>
		p.state === "online" ? '#4bae4f'
			: p.state === "ingame" ? '#fa8c16'
			: p.state === "offline" ? '#9ca3af'
			: '#000'};
	}
`;
