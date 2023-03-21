import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-top: 15vh;
	width: 100%;
	gap: 5em;

	@media only screen and (max-width: 768px) {
		width: 100%;
		padding: 24px 0px;
	}
`;
