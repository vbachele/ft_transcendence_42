import { DefaultTheme } from "styled-components";

// https://atmos.style/blog/working-with-colors-in-code

// https://atmos.style/ : create color palettes
const lightPalette = {
	primary: {
		300: "#A3A4FF",
		400: "#8884FF",
		500: "#6C5EFA",
		600: "#573CFA",
	},
};

export const light: DefaultTheme = {
	name: "light",
	borderRadius: "5px",

	colors: {
		main: "#fff",
		secondary: "#000",
	},
};

export const dark: DefaultTheme = {
	name: "dark",
	borderRadius: "5px",

	colors: {
		main: "#171717",
		secondary: "#fff",
	},
};
