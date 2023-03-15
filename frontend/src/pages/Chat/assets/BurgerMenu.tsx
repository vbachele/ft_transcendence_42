import {useContext} from 'react';
import {ThemeContext} from 'styled-components';

function BurgerMenu() {
	const theme = useContext(ThemeContext);
	return (
		<svg
			width="24"
			height="18"
			viewBox="0 0 24 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.75 12.75H23.25V10.25H0.75V12.75ZM0.75 17.75H23.25V15.25H0.75V17.75ZM0.75 7.75H23.25V5.25H0.75V7.75ZM0.75 0.25V2.75H23.25V0.25H0.75Z"
				fill={theme.name === 'light' ? 'black' : 'white'}
			/>
		</svg>
	);
}

export default BurgerMenu;
