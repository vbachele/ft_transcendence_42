import DarkMode from "Components/DarkMode";
import styles from 'Components/NavBar/Nav.module.css'
import { H1Title, NormalText } from 'Components/Text';
import UserAvatarIcon from "Components/UploadAvatar";
import DefaultAvatar from 'Components/UploadAvatar/Images/DefaultAvatar.png'



function displayNickname(){
	return(
		<div className={styles['Nav-link-container-nickmenu']}>
			<NormalText fontSize={'20px'} fontWeight={'600'}> vbachele </NormalText>
			<UserAvatarIcon width={'40px'} height={'40px'} src={DefaultAvatar}/>
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
			<div>{displayNickname()}</div>
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