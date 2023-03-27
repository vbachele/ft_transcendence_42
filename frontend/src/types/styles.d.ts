import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;

		colors: {
			background: string;
			text: string;
			main: string;
			secondary: string;
			third: string;
			hover: string;
		};
	}
}
