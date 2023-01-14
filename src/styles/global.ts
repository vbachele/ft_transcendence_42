import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Montserrat', sans-serif;
	}

	body {
		align-items: center;
		text-align: center;
		background-color: ${(props) => props.theme.colors.main};
		color: ${(props) => props.theme.colors.secondary};
		transition: background-color 0.25s linear, color 0.25s linear;
	}
`;

export default GlobalStyle;
