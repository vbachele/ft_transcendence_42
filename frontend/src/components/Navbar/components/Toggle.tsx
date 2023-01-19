import {ReactComponent as Moon} from '../assets/moon.svg';
import {ReactComponent as Sun} from '../assets/sun.svg';
import {ChangeEvent, useEffect, useState} from 'react';
import {StyledToggle} from '../Navbar.styles';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Toggle = ({setTheme}: IProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	useEffect(() => {
		const checked = localStorage.getItem('isChecked') === 'true';
		setIsChecked(checked);
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
		<StyledToggle>
			<input
				type="checkbox"
				style={{display: 'none'}}
				checked={isChecked}
				onChange={handleChange}
			/>
			{isChecked ? <Sun /> : <Moon />}
		</StyledToggle>
	);
};

export default Toggle;
