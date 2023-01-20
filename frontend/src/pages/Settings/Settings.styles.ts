import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: clamp(100vw, 394px, 394px);
	gap: 30px;
	background: grey;
	/* Inside auto layout */

	flex: none;
	order: 2;
	flex-grow: 0;
`;
