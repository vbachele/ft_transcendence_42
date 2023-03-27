import {Link} from 'react-router-dom';

import {ReactComponent as Play} from '../assets/play.svg';
import {ReactComponent as Chat} from '../assets/chat.svg';
import {ReactComponent as Leaderboard} from '../assets/leaderboard.svg';
import {ReactComponent as Dashboard} from '../assets/dashboard.svg';
import {ReactComponent as Friends} from '../assets/social.svg';
import {ReactComponent as Settings} from '../assets/settings.svg';
import {ReactComponent as Logout} from '../assets/logout.svg';
import useComponentVisible from 'hooks/useComponentVisible';
import * as S from './Dropdown.styles';
import * as F from 'styles/font.styles';

import {useUserInfos} from 'contexts/User/userContent';
import {ToggleDrop} from './ToggleDrop';
import {useContext, useState} from 'react';
import LogoutPopup from 'components/Popup/Logout/LogoutPopup';
import {usePopup} from 'contexts/Popup/Popup';
import {ClientGameEvents} from 'events/game.events';
import SocketContext from 'contexts/Socket/context';
import {GameMode} from 'pages/Game/types/game.type';

const menuVariants = {
	open: {
		transform: 'translateX(0%)',
	},
	closed: {
		transform: 'translateX(150%)',
	},
};

const menuTransition = {
	type: 'spring',
	duration: 0.5,
	bounce: 0,
};

const Dropdown = () => {
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();
	const {image, userName, coalition} = useUserInfos();
	const [showGameModes, setShowGameModes] = useState(false);
	const {socket} = useContext(SocketContext).SocketState;

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
			<img className="avatar" src={image.image} onClick={toggleDrop} />
			<S.DropdownContainer
				initial={false}
				animate={isOpen ? 'open' : 'closed'}
				variants={menuVariants}
				transition={menuTransition}
			>
				{/* PROFILE */}
				<S.User>
					<>
						<Link to={`/dashboard/${userName.userName}`} onClick={toggleDrop}>
							<img src={image.image} />
						</Link>
						<S.User__Infos>
							<Link to={`/dashboard/${userName.userName}`} onClick={toggleDrop}>
								<F.H5>{userName.userName}</F.H5>
							</Link>
							<Link
								to="/leaderboard"
								state={{selectedOption: 'Federation', rank: 5}}
								onClick={toggleDrop}
							>
								<F.Text weight="400">{coalition.coalition}</F.Text>
							</Link>
						</S.User__Infos>
					</>
				</S.User>
				<hr className="first-hr" />
				<S.LinksContainer>
					{/* PLAY */}
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
					{/* CHAT */}
					<Link to="/chat" onClick={toggleDrop}>
						<Chat />
						<F.Text weight="400">Chat</F.Text>
					</Link>
					{/* LEADERBOARD */}
					<Link to="/leaderboard" onClick={toggleDrop}>
						<Leaderboard />
						<F.Text weight="400">Leaderboard</F.Text>
					</Link>
					{/* DASHBOARD */}
					<Link to={`/dashboard/${userName.userName}`} onClick={toggleDrop}>
						<Dashboard />
						<F.Text weight="400">Career</F.Text>
					</Link>
					<Link to={`/social`} onClick={toggleDrop}>
						<Friends />
						<F.Text weight="400">Social</F.Text>
					</Link>
				</S.LinksContainer>
				<hr className="second-hr" />
				<S.LinksContainer>
					{/* SETTINGS */}
					<Link to="/settings" onClick={toggleDrop}>
						<Settings />
						<F.Text weight="400">Settings</F.Text>
					</Link>
					{/* LOGOUT */}
					<S.Button onClick={handleLogout}>
						<Logout />
						<F.Text weight="400">Log Out</F.Text>
					</S.Button>
				</S.LinksContainer>
			</S.DropdownContainer>
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
