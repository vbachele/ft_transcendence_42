import styled from 'styled-components';

export const DashboardGrid = styled.div`
	height: 800px;
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr 1fr;
	gap: 1em;
	padding: 1em;

	.subcontainer {
		background-color: rgba(224, 79, 95, 0.1);
		border-radius: 4px;
		padding: 0.5em;
		display: grid;
		grid-template-columns: 1.5fr 3fr;
		grid-template-rows: 1.5fr 1fr;
		gap: 0.5em;
	}
`;
