import React, {useContext, useState} from 'react';
import logo from 'assets/logo-text.svg';
import * as S from './Home.styles';
import {Link} from 'react-router-dom';
import LogoutPopup from 'components/Popup/Logout/LogoutPopup';
import SearchPlayer from 'components/Popup/SearchPlayer';
import PopupContext, {usePopup} from 'contexts/Popup/popup';
import GameFound from 'components/Popup/components/GameFound/GameFound';
import GameInvite from 'components/Popup/GameInvite/GameInvite';
import UserInvitedToGame from 'components/Popup/UserInvitedToGame';

const Testpage = () => {
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();
	const {invitation, setInvitation} = usePopup();
	const {hasInvited, setHasInvited} = usePopup();

	const handleInvite = () => {
		setInvitation({invited: !invitation.invited});
	};

	const handleInvited = () => {
		setHasInvited({hasInvited: !hasInvited.hasInvited});
	};

	const handlePlay = () => {
		setPopup({toggle: !popup.toggle});
	};

	const toggleLogout = () => {
		setLogout(!logout);
	};

	return (
		<S.Container>
			<S.bgvid id="bgvid" autoPlay loop muted playsInline>
				<source
					src="https://cdn.discordapp.com/attachments/1067488107827576916/1067743308367020092/background.mp4"
					type="video/mp4"
				/>
			</S.bgvid>
			<S.main id="main">
				<S.left id="left">
					<S.logo id="logo">
						<S.img src={logo} alt="" />
					</S.logo>
					<S.menus id="menus">
						<S.menuHighlight id="menu-highlight" />
						<S.logoutButton onClick={handlePlay}>
							<S.italicHighlight className="italic highlight">
								PLAY
							</S.italicHighlight>
						</S.logoutButton>
						<S.link to="/leaderboard">
							<S.italic className="italic">LEADERBOARD</S.italic>
						</S.link>
						<S.link to="/career">
							<S.italic className="italic">CAREER</S.italic>
						</S.link>
						<S.link to="/chat">
							<S.italic className="italic">CHAT</S.italic>
						</S.link>
						{/* TO REMOVE AFTER TEST */}
						<S.logoutButton onClick={handleInvite}>
							{invitation.invited && <GameInvite />}
							<S.italic className="italic">INVITE</S.italic>
						</S.logoutButton>
						<S.logoutButton onClick={handleInvited}>
							{hasInvited.hasInvited && <UserInvitedToGame />}
							<S.italic className="italic">INVITED</S.italic>
						</S.logoutButton>
						<S.link to="/social">
							<S.normal className="normal">SOCIAL</S.normal>
						</S.link>
						<S.link to="/settings">
							<S.normal className="normal">SETTINGS</S.normal>
						</S.link>
						<S.logoutButton
							className="navbar__subMenu-linkButton"
							onClick={toggleLogout}
						>
							{logout && (
								<LogoutPopup
									click={logout}
									onClose={() => setLogout(false)}
								></LogoutPopup>
							)}
							<S.normal className="normal">LOGOUT</S.normal>
						</S.logoutButton>
					</S.menus>
				</S.left>
				<S.hero id="hero">
					<S.heroName id="hero-name">VBACHELE</S.heroName>
					<S.heroUnlocks id="hero-unlocks">
						<span>1</span>/26 ACHIEVEMENTS
					</S.heroUnlocks>
				</S.hero>
			</S.main>
		</S.Container>
	);
};

export default Testpage;
