import {useEffect, useState} from 'react';
import Avatar from 'assets/default-avatar.png';
import {Link} from 'react-router-dom';

import arrow from 'assets/arrow.svg';
import play from 'assets/play.png';
import spectate from 'assets/spectate.png';
import chat from 'assets/chat.png';
import leaderboard from 'assets/leaderboard.png';
import stats from 'assets/stats.png';
import settings from 'assets/settings.png';
import logout from 'assets/logout.png';

import './styles.css';

const Dropdown = () => {
	const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);

	const toggleSubMenu = () => {
		setSubMenuOpen(!subMenuOpen);
	};

	return (
		<>
			<img src={Avatar} onClick={toggleSubMenu} />
			{subMenuOpen && (
				<div className="navbar__subMenu closed">
					<div className="navbar__subMenu__user">
						<Link to="/dashboard" className="navbar__subMenu__user-link">
							<img className="avatar" src={Avatar} />
						</Link>
						<div className="navbar__subMenu__user__name-coa">
							<h3>username</h3>
							<p>coalition</p>
						</div>
					</div>
					<hr />
					{/* PLAY */}
					<Link to="/game" className="navbar__subMenu-link" onClick={toggleSubMenu}>
						<img className="navbar__subMenu-link-logo" src={play} />
						<p>Play</p>
						<img
							className="navbar__subMenu-link-arrow filter-white"
							src={arrow}
						/>
					</Link>
					{/* SPECTATE */}
					<Link
						to="/spectate"
						className="navbar__subMenu-link"
						onClick={toggleSubMenu}
					>
						<img className="navbar__subMenu-link-logo" src={spectate} />
						<p>Spectate</p>
						<img
							className="navbar__subMenu-link-arrow filter-white"
							src={arrow}
						/>
					</Link>
					{/* CHAT */}
					<Link
						to="/chat"
						className="navbar__subMenu-link"
						onClick={toggleSubMenu}
					>
						<img className="navbar__subMenu-link-logo" src={chat} />
						<p>Chat</p>
						<img
							className="navbar__subMenu-link-arrow filter-white"
							src={arrow}
						/>
					</Link>
					{/* LEADERBOARD */}
					<Link
						to="/leaderboard"
						className="navbar__subMenu-link"
						onClick={toggleSubMenu}
					>
						<img className="navbar__subMenu-link-logo" src={leaderboard} />
						<p>Leaderboard</p>
						<img
							className="navbar__subMenu-link-arrow filter-white"
							src={arrow}
						/>
					</Link>
					{/* DASHBOARD */}
					<Link
						to={`/dashboard/66`}
						className="navbar__subMenu-link"
						onClick={toggleSubMenu}
					>
						<img className="navbar__subMenu-link-logo" src={stats} />
						<p>My Statistics</p>
						<img
							className="navbar__subMenu-link-arrow filter-white"
							src={arrow}
						/>
					</Link>
					<hr />
					{/* SETTINGS */}
					<Link
						to="/dashboard/5"
						className="navbar__subMenu-link"
						onClick={toggleSubMenu}
					>
						<img className="navbar__subMenu-link-logo" src={settings} />
						<p>Settings</p>
						<img
							className="navbar__subMenu-link-arrow filter-white"
							src={arrow}
						/>
					</Link>
					{/* LOGOUT */}
					<Link
						to="/logout"
						className="navbar__subMenu-link"
						onClick={toggleSubMenu}
					>
						<img className="navbar__subMenu-link-logo" src={logout} />
						<p>Log Out</p>
						<img
							className="navbar__subMenu-link-arrow filter-white"
							src={arrow}
						/>
					</Link>
				</div>
			)}
		</>
	);
};

export default Dropdown;
