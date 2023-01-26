import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	/* * {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Montserrat', sans-serif;
	} */

	body {
		background-color: ${(props) => props.theme.colors.main};
		color: ${(props) => props.theme.colors.secondary};
	}
`;

export const Content = styled.div`
	margin: 0;
`;
