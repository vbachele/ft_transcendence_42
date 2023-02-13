import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 1em;
	margin-top: 8em;

	@media only screen and (max-width: 768px) {
		.logo {
			width: 45%;
			height: auto;
		}
	}
`;

export const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 3em;
	gap: 2em;
	a {
		text-decoration: none;
	}
`;
