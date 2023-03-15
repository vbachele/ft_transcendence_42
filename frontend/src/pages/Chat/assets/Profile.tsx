import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';

function Profile() {
	const theme = useContext(ThemeContext);
	return (
		<svg
			width="22"
			height="23"
			viewBox="0 0 22 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.7992 4.8C15.7992 7.45097 13.6502 9.6 10.9992 9.6C8.34825 9.6 6.19922 7.45097 6.19922 4.8C6.19922 2.14903 8.34825 0 10.9992 0C13.6502 0 15.7992 2.14903 15.7992 4.8Z"
				fill={theme.name === 'light' ? 'black' : 'white'}
			/>
			<path
				d="M0.199225 21.6C0.199245 17.6235 3.42279 14.4 7.39922 14.4L14.5992 14.4C18.5757 14.4 21.7992 17.6236 21.7992 21.6V22.8H0.199219L0.199225 21.6Z"
				fill={theme.name === 'light' ? 'black' : 'white'}
			/>
		</svg>
	);
}

export default Profile;
