import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
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
	}

	body {
		background-color: ${(props) => props.theme.colors.main};
		color: ${(props) => props.theme.colors.secondary};

		::-webkit-scrollbar{
			display: none;
		}
	}
`;
