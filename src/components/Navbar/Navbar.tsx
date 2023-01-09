import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import logo from "assets/logo.svg";
import arrow from "assets/arrow.svg";
import play from "assets/play.png";
import watch from "assets/watch.png";
import chat from "assets/chat.png";
import leaderboard from "assets/leaderboard.png";
import stats	 from "assets/stats.png";
import settings from "assets/settings.png";
import logout from "assets/logout.png";
import { IUser } from "types/models";
import './styles.css'

interface IProps {
	player: IUser;
}

const Navbar = ({player}: IProps) => {
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
		<nav className="navbar">
			<img src={logo} className="navbar__logo" />
			<ul className="navbar__menu">
				<li className="navbar__menu-item"><Link to="/">Play</Link></li>
				<li className="navbar__menu-item"><Link to="/leaderboard">Leaderboard</Link></li>
			</ul>
			<img src={player.image} className="navbar__avatar" ref={avatarRef} onClick={ToggleSubMenu} />

			{/* SUB MENU */}
			<CSSTransition
				nodeRef={subMenuRef}
				in={subMenuOpen}
				timeout={200}
				classNames="fade"
				unmountOnExit
			>
			<div ref={subMenuRef} className="navbar__subMenu closed" onClick={ToggleSubMenu}>
					<div className="navbar__subMenu__user">
						<Link to="/dashboard" className="navbar__subMenu__user-link">
							<img src={player.image} />
						</Link>
						<div className="navbar__subMenu__user__name-coa">
							<h3>{player.name}</h3>
							<p>{player.coalition}</p>
						</div>
					</div>
				<hr />
				{/* PLAY */}
				<Link to="/" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={play}/>
					<p>Play</p>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* SPECTATE */}
				<Link to="/watch" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={watch}/>
					<p>Spectate</p>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* CHAT */}
				<Link to="/chat" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={chat}/>
					<p>Chat</p>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* LEADERBOARD */}
				<Link to="/leaderboard" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={leaderboard}/>
					<p>Leaderboard</p>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* DASHBOARD */}
				<Link to={`/dashboard/${player.id}`} className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={stats}/>
					<p>My Statistics</p>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				<hr />
				{/* SETTINGS */}
				<Link to="/settings" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={settings}/>
					<p>Settings</p>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
				{/* LOGOUT */}
				<Link to="/logout" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
					<img className="navbar__subMenu-link-logo" src={logout}/>
					<p>Log Out</p>
					<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
				</Link>
			</div>
			</CSSTransition>
		</nav>
	);
}

export default Navbar;
