import {H1Title, NormalText} from 'components/Text';
import DefaultAvatar from 'components/UploadAvatar/Images/DefaultAvatar.png';
import {useContext, useState} from 'react';
import UserContext from 'components/Context/userContent';
import DarkMode from 'components/DarkMode';
// import Menu from "../Menu";

import {ReactComponent as Logo} from '/public/logo_text.svg';
import {ReactComponent as Avatar} from './assets/default-avatar.svg';
import {StyledNav, Menu, Divider} from './Navbar.styles';

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

const Navbar: React.FC = () => {
	// get user context

	return (
		<StyledNav>
			<Logo />
			{/* <DarkMode /> */}
			{/* {isLogged ? <Avatar /> : <Register />} */}

			<Menu>
				<button>Theme</button>
				<Divider />
				<Avatar />
			</Menu>
		</StyledNav>
		// <nav className={styles.navbar}>
		// 	<H1Title fontSize={'36px'} fontWeight={'700'} string={'24px'}>
		// 		PONG
		// 	</H1Title>
		// </nav>
	);
};

export default Navbar;
