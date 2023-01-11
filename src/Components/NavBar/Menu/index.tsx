import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import './styles.css'
// import { CSSTransition } from 'react-transition-group';
import DefaultAvatar from 'Components/UploadAvatar/Images/DefaultAvatar.png'
import PlayIcon from "./Images/play.svg" 
import { MenuText, Subtitle } from 'components/Text'
import { Link } from 'react-router-dom'
import arrow from 'assets/arrow.svg';
import play from 'assets/play.png';
import watch from 'assets/watch.png';
import chat from 'assets/chat.png';
import leaderboard from 'assets/leaderboard.png';
import stats	 from 'assets/stats.png';
import settings from 'assets/settings.png';
import logout from 'assets/logout.png';
import DarkMode from 'components/DarkMode'

export const Menu_layout = styled.div`
	box-sizing: border-box;

	/* Auto layout */ 

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 24px;
	gap: 24px;
	position:relative;
	right: 320px;
	bottom: -60px;
	background-color: #E04F5F;

	border: 1px solid #FFFFFF;
	border-radius: 4px;

	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 0;
`

const SubMenu:React.FC<{}> = () => 
{
	
	const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
	const subMenuRef = useRef<HTMLDivElement>(null);
	const avatarRef = useRef<HTMLImageElement>(null);

	const ToggleSubMenu = () => {
		setSubMenuOpen(!subMenuOpen);
	}

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
				if (subMenuRef.current &&
						!subMenuRef.current.contains(event.target as Node) &&
						!avatarRef.current!.contains(event.target as Node)) {
					setSubMenuOpen(false);
				}
			};
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [subMenuRef, avatarRef, setSubMenuOpen]);
	return (
		<div ref={subMenuRef} className="navbar__subMenu closed" onClick={ToggleSubMenu}>
			{/* <CSSTransition
				nodeRef={subMenuRef}
				in={subMenuOpen}
				timeout={200}
				classNames="fade"
				unmountOnExit
			> */}
			{/* <div className="navbar__subMenu__user"> */}
			<Link to="/login-page" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={play}/>
					<Subtitle color='white' fontSize={'22px'} fontWeight={0}>Play</Subtitle>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* SPECTATE */}
				<Link to="/watch" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={watch}/>
					<Subtitle color='white' fontSize={'22px'}>Spectate</Subtitle>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* CHAT */}
				<Link to="/chat" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={chat}/>
					<Subtitle color='white' fontSize={'22px'}>Chat</Subtitle>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* LEADERBOARD */}
				<Link to="/leaderboard" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={leaderboard}/>
					<Subtitle color='white' fontSize={'22px'}>Leaderboard</Subtitle>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* DASHBOARD */}
				<Link to={`/dashboard/${1}`} className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={stats}/>
					<Subtitle color='white' fontSize={'22px'}>My Stats</Subtitle>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				<hr />
				{/* SETTINGS */}
				<Link to="/dashboard/5" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={settings}/>
					<Subtitle color='white' fontSize={'22px'}>Settings</Subtitle>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* LOGOUT */}
				<Link to="/logout" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={logout}/>
					<Subtitle color='white' fontSize={'22px'}>Log Out</Subtitle>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* </CSSTransition> */}
		</div>
	);
}


const Menu = () => {
  return (
		<SubMenu ></SubMenu>
  )
}

export default Menu