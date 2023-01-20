import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	/* #root {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0px;
		padding: 0px;
	} */

	html, body {
		background-color: ${(props) => props.theme.colors.main};
		color: ${(props) => props.theme.colors.secondary};
	}
`;

export const Content = styled.div`
	margin: 0 5%;
`;
