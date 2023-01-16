import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import './styles.css';
// import { CSSTransition } from 'react-transition-group';
import DefaultAvatar from 'components/UploadAvatar/Images/DefaultAvatar.png';
import PlayIcon from './Images/play.svg';
import {MenuText, Subtitle} from 'styles/font.styles';
import {Link} from 'react-router-dom';
import arrow from 'assets/arrow.svg';
import {GiPingPongBat} from 'react-icons/gi';
import {BsFillPlayBtnFill} from 'react-icons/bs';
import {IoMdChatboxes, IoMdSettings} from 'react-icons/io';
import {MdLeaderboard, MdQueryStats} from 'react-icons/md';
import {RiLogoutBoxRFill} from 'react-icons/ri';
import UserAvatarIcon from 'components/UploadAvatar/Avatar';
import UserContext from 'components/Context/userContent';

export const Menu_layout = styled.div`
	box-sizing: border-box;

	/* Auto layout */

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 24px;
	gap: 24px;
	position: relative;
	right: 320px;
	bottom: -60px;
	background-color: #e04f5f;

	border: 1px solid #ffffff;
	border-radius: 4px;

	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 0;
`;

const SubMenu: React.FC<{}> = () => {
	const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
	const subMenuRef = useRef<HTMLDivElement>(null);
	const avatarRef = useRef<HTMLImageElement>(null);

	const ToggleSubMenu = () => {
		setSubMenuOpen(!subMenuOpen);
	};

	const userContext = useContext(UserContext);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				subMenuRef.current &&
				!subMenuRef.current.contains(event.target as Node) &&
				!avatarRef.current!.contains(event.target as Node)
			) {
				setSubMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [subMenuRef, avatarRef, setSubMenuOpen]);
	return (
		<div
			ref={subMenuRef}
			className="navbar__subMenu closed"
			onClick={ToggleSubMenu}
		>
			{/* <CSSTransition
				nodeRef={subMenuRef}
				in={subMenuOpen}
				timeout={200}
				classNames="fade"
				unmountOnExit
			> */}
			<div className="navbar__subMenu__user">
				<Link to="/dashboard" className="navbar__subMenu__user-link">
					<UserAvatarIcon width={'40px'} height={'40px'} src={DefaultAvatar} />
				</Link>
				<div className="navbar__subMenu__user__name-coa">
					<Subtitle color="white" fontSize={'20px'} fontWeight={'600'}>
						{userContext?.user?.nickname}
					</Subtitle>
					<Subtitle color="white">Federation</Subtitle>
				</div>
			</div>
			<hr />
			<Link
				to="/login"
				className="navbar__subMenu-link"
				onClick={ToggleSubMenu}
			>
				<GiPingPongBat
					style={{width: '25px', height: '25px'}}
					className="navbar__subMenu-link-logo"
				></GiPingPongBat>
				<Subtitle color="white" fontSize={'16px'} fontWeight={0}>
					Play
				</Subtitle>
				<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
			</Link>
			{/* SPECTATE */}
			<Link
				to="/watch"
				className="navbar__subMenu-link"
				onClick={ToggleSubMenu}
			>
				<BsFillPlayBtnFill
					style={{width: '25px', height: '25px'}}
					className="navbar__subMenu-link-logo"
				></BsFillPlayBtnFill>
				<Subtitle color="white" fontSize={'16px'}>
					Spectate
				</Subtitle>
				<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
			</Link>
			{/* CHAT */}
			<Link to="/chat" className="navbar__subMenu-link" onClick={ToggleSubMenu}>
				<IoMdChatboxes
					style={{width: '25px', height: '25px'}}
					className="navbar__subMenu-link-logo"
				></IoMdChatboxes>
				<Subtitle color="white" fontSize={'16px'}>
					Chat
				</Subtitle>
				<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
			</Link>
			{/* LEADERBOARD */}
			<Link
				to="/leaderboard"
				className="navbar__subMenu-link"
				onClick={ToggleSubMenu}
			>
				<MdLeaderboard
					style={{width: '25px', height: '25px'}}
					className="navbar__subMenu-link-logo"
				></MdLeaderboard>
				<Subtitle color="white" fontSize={'16px'}>
					Leaderboard
				</Subtitle>
				<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
			</Link>
			{/* DASHBOARD */}
			<Link
				to={`/dashboard/${1}`}
				className="navbar__subMenu-link"
				onClick={ToggleSubMenu}
			>
				<MdQueryStats
					style={{width: '25px', height: '25px'}}
					className="navbar__subMenu-link-logo"
				></MdQueryStats>
				<Subtitle color="white" fontSize={'16px'}>
					My Stats
				</Subtitle>
				<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
			</Link>
			<hr />
			{/* SETTINGS */}
			<Link
				to="/dashboard/5"
				className="navbar__subMenu-link"
				onClick={ToggleSubMenu}
			>
				<IoMdSettings
					style={{width: '25px', height: '25px'}}
					className="navbar__subMenu-link-logo"
				></IoMdSettings>
				<Subtitle color="white" fontSize={'16px'}>
					Settings
				</Subtitle>
				<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
			</Link>
			{/* LOGOUT */}
			<Link
				to="/logout"
				className="navbar__subMenu-link"
				onClick={ToggleSubMenu}
			>
				<RiLogoutBoxRFill
					style={{width: '25px', height: '25px'}}
					className="navbar__subMenu-link-logo"
				></RiLogoutBoxRFill>
				<Subtitle color="white" fontSize={'16px'}>
					Log Out
				</Subtitle>
				<img className="navbar__subMenu-link-arrow filter-white" src={arrow} />
			</Link>
			{/* </CSSTransition> */}
		</div>
	);
};

const Menu = () => {
	return <SubMenu />;
};

export default Menu;
