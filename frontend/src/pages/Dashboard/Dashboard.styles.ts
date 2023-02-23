import styled from 'styled-components';

export const Container = styled.div``;

export const SubContainer = styled.div`
	margin: 32px 96px;

	display: grid;
	grid-template-rows: 1fr 5fr auto;
	grid-template-columns: 3fr 1fr;
	gap: 32px 64px;

	@media screen and (max-width: 1000px) {
		display: flex;
		flex-direction: column;
	}
`;
