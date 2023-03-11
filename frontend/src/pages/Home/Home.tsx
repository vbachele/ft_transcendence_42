import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useUserInfos} from 'contexts/User/userContent';
import {usePopup} from 'contexts/Popup/Popup';
import Popup from 'components/Popup';
import logo from 'assets/logo-text.svg';
import logo_ai from 'assets/logo_ai.png';
import * as S from './Home.styles';

const Homepage = () => {
	const {userName, achievements} = useUserInfos();
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();

	const handlePlay = () => {
		setPopup({toggle: !popup.toggle});
	};
	const toggleLogout = () => {
		setLogout(!logout);
	};

	console.log('userName: ', userName.userName);
	console.log('achievements: ', achievements.achievements.length);

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
				<S.UserName>{userName?.userName}</S.UserName>
				<S.UserAchievements>
					{achievements && achievements.achievements.length} / 16 ACHIEVEMENTS
				</S.UserAchievements>
			</S.UserInfo>
		</S.Container>
	);
};

export default Homepage;
