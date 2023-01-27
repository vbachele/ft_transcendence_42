import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.colors.main};
		color: ${(props) => props.theme.colors.secondary};
	}
`;
