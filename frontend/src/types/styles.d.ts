import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		name: string;
		borderRadius: string;

		colors: {
			main: string;
			secondary: string;
		};
	}
}
