import {useState} from 'react';
import {useUserInfos} from 'contexts/User/userContent';
import {usePopup} from 'contexts/Popup/Popup';
import logo from 'assets/logo-text.svg';
import Popup from 'components/Popup';
import * as S from './Home.styles';

/* Main Functions */
const Homepage = () => {
	/* Set up variables */
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();
	const {userName, setUserName, achievements} = useUserInfos();
	/* handle buttons */
	const handlePlay = () => {
		setPopup({toggle: !popup.toggle});
	};
	const toggleLogout = () => {
		setLogout(!logout);
	};

	/* RETURN BODY */
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
						<S.link to={`/dashboard/${userName.userName}`}>
							<S.italic className="italic">CAREER</S.italic>
						</S.link>
						<S.link to="/chat">
							<S.italic className="italic">CHAT</S.italic>
						</S.link>
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
								<Popup.LogoutPopup
									click={logout}
									onClose={() => setLogout(false)}
								></Popup.LogoutPopup>
							)}
							<S.normal className="normal">LOGOUT</S.normal>
						</S.logoutButton>
					</S.menus>
				</S.left>
				<S.hero id="hero">
					<S.heroName id="hero-name">{userName?.userName}</S.heroName>
					<S.heroUnlocks id="hero-unlocks">
						{achievements?.achievements.length} / 15 ACHIEVEMENTS
					</S.heroUnlocks>
				</S.hero>
			</S.main>
		</S.Container>
	);
};

export default Homepage;
