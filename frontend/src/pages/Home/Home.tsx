import {useState} from 'react';
import {useUserInfos} from 'contexts/User/userContent';
import {usePopup} from 'contexts/Popup/Popup';
import logo from 'assets/logo-text.svg';
import logo_ai from 'assets/logo_ai.png';
import Popup from 'components/Popup';
import {Link} from 'react-router-dom';
import * as S from './Home.styles';
import * as F from 'styles/.styles';

const Homepage = () => {
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();
	const {userName, achievements} = useUserInfos();

	const handlePlay = () => {
		setPopup({toggle: !popup.toggle});
	};
	const toggleLogout = () => {
		setLogout(!logout);
	};

	return (
		<S.Container>
			<S.Background autoPlay loop muted playsInline>
				<source
					src="https://cdn.discordapp.com/attachments/1067488107827576916/1067743308367020092/background.mp4"
					type="video/mp4"
				/>
			</S.Background>
			<S.Image src={logo_ai} />
			<S.LinksContainer>
				<S.PopupButton onClick={handlePlay}>
					<S.BoldYellow>PLAY</S.BoldYellow>
				</S.PopupButton>
				<Link to="/leaderboard">
					<S.Bold>LEADERBOARD</S.Bold>
				</Link>
				<Link to={`/dashboard/${userName.userName}`}>
					<S.Bold>CAREER</S.Bold>
				</Link>
				<Link to="/chat">
					<S.Bold>CHAT</S.Bold>
				</Link>
				<Link to="/social">
					<S.Regular>SOCIAL</S.Regular>
				</Link>
				<Link to="/settings">
					<S.Regular>SETTINGS</S.Regular>
				</Link>
				<S.PopupButton onClick={toggleLogout}>
					{logout && (
						<Popup.LogoutPopup
							click={logout}
							onClose={() => setLogout(false)}
						/>
					)}
					<S.Regular>LOG OUT</S.Regular>
				</S.PopupButton>
			</S.LinksContainer>
			<S.UserInfo>
				<S.heroName>{userName?.userName}</S.heroName>
				<S.heroUnlocks>
					{achievements?.achievements.length} / 16 ACHIEVEMENTS
				</S.heroUnlocks>
			</S.UserInfo>
		</S.Container>
	);
};

export default Homepage;
