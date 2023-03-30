import React, {useContext, useState} from 'react';
import {useUserInfos} from 'contexts/User/userContent';
import {usePopup} from 'contexts/Popup/Popup';
import Popup from 'components/Popup';
import logo_ai from 'assets/logo_ai.png';
import logo from 'assets/logo-text.svg';
import * as S from './Home.styles';
import SocketContext from '../../contexts/Socket/context';
import {ClientGameEvents} from '../../events/game.events';
import {GameMode} from '../Game/types/game.type';

const Homepage = () => {
	const {userName, achievements} = useUserInfos();
	const [logout, setLogout] = useState(false);
	const [showGameModes, setShowGameModes] = useState(false);
	const {setPopup} = usePopup();
	const {socket} = useContext(SocketContext).SocketState;

	function onPlay() {
		setShowGameModes(true);
	}

	function offPlay() {
		setShowGameModes(false);
	}

	function onPlayAgainstTheClock(event: React.MouseEvent) {
		event.stopPropagation();
		socket?.emit(ClientGameEvents.SearchGame, {
			mode: GameMode.AgainstTheClock,
		});
		setPopup({toggle: true});
	}

	function onPlayScoreLimit(event: React.MouseEvent) {
		event.stopPropagation();
		socket?.emit(ClientGameEvents.SearchGame, {
			mode: GameMode.ScoreLimit,
		});
		setPopup({toggle: true});
	}

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
			<S.Image src={logo} />
			<S.LinksContainer>
				<S.BoldYellowButton
					onClick={() => setShowGameModes(!showGameModes)}
					onMouseEnter={onPlay}
					onMouseLeave={offPlay}
				>
					PLAY
					<S.GameMode className={showGameModes ? 'active' : ''}>
						<S.RegularButton onClick={onPlayAgainstTheClock}>
							Against the clock
						</S.RegularButton>
						<S.RegularButton onClick={onPlayScoreLimit}>
							Score limit
						</S.RegularButton>
					</S.GameMode>
				</S.BoldYellowButton>
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
					LOGOUT
				</S.RegularButton>
			</S.LinksContainer>
			<S.UserInfo to={`/dashboard/${userName.userName}`}>
				<S.UserName>{userName?.userName}</S.UserName>
				<S.UserAchievements>
					{achievements && achievements.achievements.length} / 15 ACHIEVEMENTS
				</S.UserAchievements>
			</S.UserInfo>
		</S.Container>
	);
};

export default Homepage;
