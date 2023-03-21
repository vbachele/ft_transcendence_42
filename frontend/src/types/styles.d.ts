import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;

		colors: {
			main: string;
			secondary: string;
		};
	}
}
