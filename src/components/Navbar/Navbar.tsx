import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/logo-text.svg';
import Avatar from 'assets/default-avatar.png';
import Toggle from './components/Toggle';
import * as S from './Navbar.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {useState} from 'react';
import Dropdown from './components/Dropdown';

// function displayMenu() {
// 	const [toggleMenu, setToggleMenu] = useState(false);
// 	const userContext = useContext(UserContext);

// 	const toggletnavclicked = () => {
// 		setToggleMenu(!toggleMenu);
// 	};

// 	return (
// 		<div className={styles['Nav-link-container-nickmenu']}>
// 			{toggleMenu && <Menu />}
// 			<button className="menuButton" onClick={toggletnavclicked}>
// 				<img style={{ width: '50px' }} src={avatar} />
// 			</button>
// 		</div>
// 	);
// }

// function Divider() {
// 	return <div className={styles.divider} />;
// }

// export const Menu = () => {
// 	return (
// 		<div className={styles['links-containers-logged']}>
// 			<div className="DarkMode">{DarkMode()}</div>
// 			<div>{'Divider' && Divider()}</div>
// 			<div>{displayMenu()}</div>
// 		</div>
// 	);
// };

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setTheme}: IProps) => {
	const [log, setLog] = useState<boolean>(false);

	return (
		<S.StyledNav>
			<Link to="/">
				<Logo />
			</Link>
			<S.Menu>
				<Toggle setTheme={setTheme} />
				<S.Divider />
				{!log && (
					<UI.SecondaryButtonSmall>
						<Link to="/login" onClick={() => setLog(true)}>
							Log in
						</Link>
					</UI.SecondaryButtonSmall>
				)}
				{log && <Dropdown />}
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;
