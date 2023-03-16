import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 15vh;
	width: 100vw;
	gap: 5em;
	text-align: center;

	flex: none;
	order: 2;
	flex-grow: 0;
	visibility: none;

	@media only screen and (max-width: 768px) {
		width: 100%;
		padding: 24px 0px;
		flex: none;
		order: 1;
		flex-grow: 0;
	}
`;
