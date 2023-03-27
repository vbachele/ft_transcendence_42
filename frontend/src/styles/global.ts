import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Montserrat', sans-serif;

		::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}
		::-webkit-scrollbar-track {
			box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
			border-radius: 8px;
			background-color: ${(p) => (p.theme.name === 'light' ? '#f5f5f5' : '#8f8f8f')};
		}
		::-webkit-scrollbar-thumb {
				border-radius: 8px;
				box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
				background-color: ${(p) => (p.theme.name === 'light' ? '#8f8f8f' : '#393939')};

				:hover {
					background-color: ${(p) => (p.theme.name === 'light' ? '#171717' : '#fff')};
				}
		}

		.ant-dropdown-menu-item, .ant-dropdown-menu-item-only-child {
			padding: 0 !important;
		}
	}

	#root {
		--mainColor: ${(p) => p.theme.colors.main};
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0px;
		padding: 0px;
	}

	body {
		background-color: ${(props) => props.theme.colors.background};
		color: ${(props) => props.theme.colors.text};
		margin: 0px;
		padding: 0px;
		overflow-x: hidden;

		::-webkit-scrollbar{
			display: none;
		}
	}
`;
