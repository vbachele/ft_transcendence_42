import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Play} from 'components/Navbar/assets/play.svg';
import {ReactComponent as Chat} from 'components/Navbar/assets/chat.svg';
import {ReactComponent as Leaderboard} from 'components/Navbar/assets/leaderboard.svg';
import {ReactComponent as Dashboard} from 'components/Navbar/assets/dashboard.svg';
import {ReactComponent as Friends} from 'components/Navbar/assets/social.svg';
import {ReactComponent as Settings} from 'components/Navbar/assets/settings.svg';
import {ReactComponent as Logout} from 'components/Navbar/assets/logout.svg';
import useComponentVisible from 'hooks/useComponentVisible';
import {useUserInfos} from 'contexts/User/userContent';
import {ToggleDrop} from './ToggleDrop';
import LogoutPopup from 'components/Popup/Logout/LogoutPopup';
import {usePopup} from 'contexts/Popup/Popup';
import * as S from './Dropdown.styles';
import * as F from 'styles/font.styles';
import {ClientGameEvents} from '../../../../events/game.events';
import {GameMode} from '../../../../pages/Game/types/game.type';
import SocketContext from '../../../../contexts/Socket/context';

const Dropdown = () => {
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();
	const {image, userName} = useUserInfos();
	const {socket} = useContext(SocketContext).SocketState;
	const [showGameModes, setShowGameModes] = useState(false);

	const {
		ref: dropRef,
		isComponentVisible: isOpen,
		setIsComponentVisible: setIsOpen,
	} = useComponentVisible(false);

	const toggleDrop = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = () => {
		setIsOpen(!isOpen);
		setLogout(!logout);
	};

	function onPlay() {
		setShowGameModes(true);
	}

	function offPlay() {
		setShowGameModes(false);
	}

	function onPlayAgainstTheClock() {
		socket?.emit(ClientGameEvents.SearchGame, {
			mode: GameMode.AgainstTheClock,
		});
		setPopup({toggle: true});
		setIsOpen(!isOpen);
	}

	function onPlayScoreLimit() {
		socket?.emit(ClientGameEvents.SearchGame, {
			mode: GameMode.ScoreLimit,
		});
		setPopup({toggle: true});
		setIsOpen(!isOpen);
	}

	if (isOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflowY = 'auto';
	}

	return (
		<S.Container ref={dropRef}>
			<ToggleDrop toggle={toggleDrop} isOpen={isOpen} />
			<div style={{cursor: 'pointer'}} onClick={toggleDrop}>
				<img className="avatar" src={image.image} />
			</div>
			{isOpen && (
				<S.DropdownContainer>
					<S.User to={`/dashboard/${userName.userName}`} onClick={toggleDrop}>
						<img src={image.image} />
						<F.H4>{userName.userName}</F.H4>
					</S.User>
					<S.LinksContainer>
						<S.PlayContainer
							onClick={() => setShowGameModes(!showGameModes)}
							onMouseEnter={onPlay}
							onMouseLeave={offPlay}
						>
							<Play />
							<S.Content>
								<F.Text weight="400">Play</F.Text>
								<S.GameMode
									className={showGameModes ? 'active' : ''}
									style={{margin: '0'}}
								>
									<S.Button onClick={onPlayAgainstTheClock}>
										Against the clock
									</S.Button>
									<S.Button onClick={onPlayScoreLimit}>Score limit</S.Button>
								</S.GameMode>
							</S.Content>
						</S.PlayContainer>
						<Link
							to="/chat"
							onClick={toggleDrop}
							style={{position: 'relative'}}
						>
							<Chat />
							<F.Text weight="500">Chat</F.Text>
						</Link>
						<Link to="/leaderboard" onClick={toggleDrop}>
							<Leaderboard />
							<F.Text weight="500">Leaderboard</F.Text>
						</Link>
						<Link to={`/dashboard/${userName.userName}`} onClick={toggleDrop}>
							<Dashboard />
							<F.Text weight="500">Career</F.Text>
						</Link>
						<Link
							to={`/social`}
							onClick={toggleDrop}
							style={{position: 'relative'}}
						>
							<Friends />
							<F.Text weight="500">Social</F.Text>
						</Link>
					</S.LinksContainer>
					<hr className="second-hr" />
					<S.LinksContainer>
						<Link to="/settings" onClick={toggleDrop}>
							<Settings />
							<F.Text weight="500">Settings</F.Text>
						</Link>
						<S.Button onClick={handleLogout}>
							<Logout />
							<F.Text weight="500">Logout</F.Text>
						</S.Button>
					</S.LinksContainer>
				</S.DropdownContainer>
			)}
			{logout && (
				<LogoutPopup
					click={logout}
					onClose={() => setLogout(false)}
				></LogoutPopup>
			)}
		</S.Container>
	);
};

export default Dropdown;
