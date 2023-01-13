import UncheckedDarkMode from './Images/Moon.svg';
import './index.css';
import React, {
	ChangeEventHandler,
	createContext,
	useEffect,
	useState,
} from 'react';
import CheckedDarkMode from './Images/Sun.svg';

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

// Here I set the dark mode :
// I change: the icon, I applied to light/dark theme, I store the current Mode
// Then I applied the preference of the user fro; is browser
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
				style={{ display: 'none' }}
				id="DarkMode"
				onChange={HandleChange}
				checked={isChecked}
				defaultChecked={defaultDark}
			/>
			<img
				src={isChecked ? CheckedDarkMode : UncheckedDarkMode}
				alt="DarkMode"
				className="DarkMode"
			/>
		</label>
	);
}

export default DarkMode;
