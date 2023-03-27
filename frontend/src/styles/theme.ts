import {DefaultTheme} from 'styled-components';

export const light: DefaultTheme = {
	name: 'light',

	colors: {
		background: '#fafafa',
		text: '#000',
		main: '#dc4f19',
		secondary: '#f0f0f0',
		third: '#e6e6e6',
		hover: '#dbdbdb',
	},
};

export const dark: DefaultTheme = {
	name: 'dark',

	colors: {
		background: '#202020',
		text: '#eee',
		main: '#dc4f19',
		secondary: '#2e2e2e',
		third: '#383838',
		hover: '#4d4d4d',
	},
};
