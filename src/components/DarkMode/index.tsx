import {ReactComponent as Moon} from './assets/moon.svg';
import {ReactComponent as Sun} from './assets/sun.svg';
import {useEffect, useState} from 'react';
import './index.css';

const setDark = () => {
	localStorage.setItem('theme', 'dark');
	document.documentElement.setAttribute('data-theme', 'dark');
};

const setLight = () => {
	localStorage.setItem('theme', 'light');
	document.documentElement.setAttribute('data-theme', 'light');
};

// Here we checked the preference of the user if he wants dark or not
const storedTheme = localStorage.getItem('theme');
const prefersDark =
	window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultDark =
	storedTheme === 'dark' || (storedTheme === null && prefersDark);

if (defaultDark) {
	setDark();
}

function DarkMode() {
	const [isChecked, setIsChecked] = useState(false);
	const [storedPref, setStoredPref] = useState(() =>
		localStorage.getItem('isChecked')
	);

	useEffect(() => {
		if (storedPref) setIsChecked(JSON.parse(storedPref));
		if (isChecked) {
			setDark();
		} else {
			setLight();
		}
	}, [isChecked]);

	function HandleChange(): void {
		setIsChecked(!isChecked);
		localStorage.setItem('isChecked', JSON.stringify(!isChecked));
		setStoredPref(JSON.stringify(!isChecked));
	}

	return (
		<label>
			<input
				type="checkbox"
				style={{display: 'none'}}
				id="DarkMode"
				onChange={HandleChange}
				checked={isChecked}
				defaultChecked={defaultDark}
			/>

			{isChecked ? <Sun /> : <Moon />}
		</label>
	);
}

export default DarkMode;