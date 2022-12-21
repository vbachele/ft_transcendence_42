import CheckDarkMode from './Images/Moon.svg';
import React, { ChangeEventHandler, createContext, useEffect, useState } from 'react'
import UncheckedDarkMode from "./Images/Sun.svg";


const setDark = () => {
	  localStorage.setItem("theme", "dark");
	  document.documentElement.setAttribute("data-theme", "dark");
	};
	
	const setLight = () => {
	  localStorage.setItem("theme", "light");
	  document.documentElement.setAttribute("data-theme", "light");
	};
	
	const storedTheme = localStorage.getItem("theme");
	
	const prefersDark =
	  window.matchMedia &&
	  window.matchMedia("(prefers-color-scheme: dark)").matches;
	
	const defaultDark =
	  storedTheme === "dark" || (storedTheme === null && prefersDark);
	
	if (defaultDark) {
	  setDark();
	}
	

	// const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => 
	// {
	// 	if (e.target.checked) {
	// 		setDark();
			
	// 	}
	// 	else {
	// 	setLight();
	//   }
	// };
	
	// Here I set the dark mode :
	// I change: the icon, I applied to light/dark theme, I store the current Mode
	// Then I applied the preference of the user fro; is browser
function DarkMode()
{
	// const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => 
	// {
	// 	if (e.target.checked) {
	// 		setDark();
			
	// 	}
	// 	else {
	// 	setLight();
	//   }
	// };
	const [isChecked, setIsChecked] = useState(false);
	console.dir(isChecked);

	// useEffect(() => {
	// 	setIsChecked(JSON.parse(localStorage.getItem('isChecked')));
	//   }, []);
	
	//   useEffect(() => {
	// 	localStorage.setItem('isChecked', String(isChecked));
	//   }, [isChecked]);

	const HandleChange: ChangeEventHandler<HTMLInputElement> = (e) => 
	{
		setIsChecked(e.target.checked);
		localStorage.setItem("theme", "dark");
		if (e.target.checked) {
			setDark();
			localStorage.setItem("image", UncheckedDarkMode);
			
		}
		else {
		setLight();
	  }
	}
	return (	
	<label>
		<input
			type="checkbox"
			style={{ display: 'none' }}
			id="DarkMode"
			onChange={(event) => {
				// toggleTheme(event);
				HandleChange(event);
			}}
			checked={isChecked}
			defaultChecked={defaultDark}
		/>
			 <img src= {isChecked ? UncheckedDarkMode : CheckDarkMode} alt="DarkMode" />
	</label>
	);
}

export default DarkMode