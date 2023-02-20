import styled from 'styled-components';

export const Container = styled.div``;

export const SubContainer = styled.div`
	margin: 32px 96px;
	border: 2px solid gray;

	display: grid;
	grid-template-rows: 1fr 5fr;
	grid-template-columns: 3fr 1fr;
	gap: 32px;
`;
