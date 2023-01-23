import {ReactComponent as Moon} from '../assets/moon.svg';
import {ReactComponent as Sun} from '../assets/sun.svg';
import {ChangeEvent, useEffect, useState} from 'react';
import {StyledToggleTheme} from '../Navbar.styles';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ToggleTheme = ({setTheme}: IProps) => {
	const userPref =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [isChecked, setIsChecked] = useState<boolean>(userPref);

	useEffect(() => {
		if (localStorage.getItem('isChecked')) {
			const checked = localStorage.getItem('isChecked') === 'true';
			setIsChecked(checked);
		}
	}, [isChecked]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
		localStorage.setItem('isChecked', e.target.checked.toString());
		if (e.target.checked) {
			localStorage.setItem('theme', 'dark');
			setTheme('dark');
		} else {
			localStorage.setItem('theme', 'light');
			setTheme('light');
		}
	};

	return (
		<StyledToggleTheme>
			<input
				type="checkbox"
				style={{display: 'none'}}
				checked={isChecked}
				onChange={handleChange}
			/>
			{isChecked ? <Sun /> : <Moon />}
		</StyledToggleTheme>
	);
};

export default ToggleTheme;
