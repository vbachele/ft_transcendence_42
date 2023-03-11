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
				<S.BoldYellowButton onClick={handlePlay}>PLAY</S.BoldYellowButton>
				<S.BoldLink to="/leaderboard">LEADERBOARD</S.BoldLink>
				<S.BoldLink to={`/dashboard/${userName.userName}`}>CAREER</S.BoldLink>
				<S.BoldLink to="/chat">CHAT</S.BoldLink>
				<S.RegularLink to="/social">SOCIAL</S.RegularLink>
				<S.RegularLink to="/settings">SETTINGS</S.RegularLink>
				<S.RegularButton onClick={toggleLogout}>
					{logout && (
						<Popup.LogoutPopup
							click={logout}
							onClose={() => setLogout(false)}
						/>
					)}
					LOG OUT
				</S.RegularButton>
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
