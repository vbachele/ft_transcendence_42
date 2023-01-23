import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	/* #root {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0px;
		padding: 0px;
	} */

	body {
		background-color: ${(props) => props.theme.colors.main};
		color: ${(props) => props.theme.colors.secondary};
		overflow-x: hidden;
		transition: background-color 0.2s linear, color 0.2s linear;
	}
`;
