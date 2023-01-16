import DarkMode from 'components/-DarkMode';

import {ReactComponent as Logo} from './assets/logo_text.svg';
import {ReactComponent as Avatar} from './assets/default-avatar.svg';
import {StyledNav, Menu, Divider} from './Navbar.styles';
import Toggle from './components/Toggle';
import {Link} from 'react-router-dom';

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
	// get user context

	return (
		<StyledNav>
			<Link to="/">
				<Logo />
			</Link>
			{/* {isLogged ? <Avatar /> : <Register />} */}

			<Menu>
				<Toggle setTheme={setTheme} />
				<Divider />
				<Avatar />
			</Menu>
		</StyledNav>
	);
};

export default Navbar;
