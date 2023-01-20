import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	html, body {
		background-color: ${(props) => props.theme.colors.main};
		color: ${(props) => props.theme.colors.secondary};
	}
`;
