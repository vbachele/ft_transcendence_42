import DarkMode from "components/DarkMode";
import styles from 'components/NavBar/Nav.module.css'
import { H1Title, NormalText } from 'components/Text';
import DefaultAvatar from 'Components/UploadAvatar/Images/DefaultAvatar.png'
import "./styles.css"
import { useContext, useState } from "react";
import UserContext from "components/Context/userContent";
import Menu from "../Menu";
import UserAvatarIcon from "components/UploadAvatar/Avatar";



function displayMenu(){
	const [toggleMenu, setToggleMenu] = useState(false);

	const toggletnavclicked= () => {
		setToggleMenu(!toggleMenu);
	}
	const userContext = useContext(UserContext);
	return(
		<div className={styles['Nav-link-container-nickmenu']}>
		 {toggleMenu && (<Menu></Menu>)}
			<button className="menuButton" onClick={toggletnavclicked}>
			<UserAvatarIcon width={'40px'} height={'40px'} src={DefaultAvatar}/>
			<NormalText fontSize={'20px'} fontWeight={'800'}> {userContext?.user?.nickname} </NormalText>				
			</button>
		</div>
		)
}

function Divider(){
	return(
		<div className={styles['Divider1']}>
		</div>
	)
}

export const MenuLogged = () => 
{
	return (
		<div className={styles['links-containers-logged']}>
			<div className="DarkMode">{DarkMode()}</div> 
			<div>{'Divider1' && Divider()}</div>
			<div>{displayMenu()}</div>
		</div>
	);
}

export const NavLogged:React.FC<{}> = () => {
    return (
		<nav className={styles.navbar}> 
			<H1Title fontSize={'36px'} fontWeight={'600'} string={'24px'}> PONG </H1Title>
			<MenuLogged/>
		</nav>
	  )
}

export default NavLogged