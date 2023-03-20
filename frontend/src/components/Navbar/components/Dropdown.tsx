import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Play} from '../assets/play.svg';
import {ReactComponent as Chat} from '../assets/chat.svg';
import {ReactComponent as Leaderboard} from '../assets/leaderboard.svg';
import {ReactComponent as Dashboard} from '../assets/dashboard.svg';
import {ReactComponent as Friends} from '../assets/social.svg';
import {ReactComponent as Settings} from '../assets/settings.svg';
import {ReactComponent as Logout} from '../assets/logout.svg';
import useComponentVisible from 'hooks/useComponentVisible';
import {useUserInfos} from 'contexts/User/userContent';
import {ToggleDrop} from './ToggleDrop';
import LogoutPopup from 'components/Popup/Logout/LogoutPopup';
import {usePopup} from 'contexts/Popup/Popup';
import * as S from './Dropdown.styles';
import * as F from 'styles/font.styles';
import {Socket} from 'socket.io-client';
import SocketContext from 'contexts/Socket/Context';

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
	const {socket} = useContext(SocketContext).SocketState;
	const [notifications, setNotifications] = useState(0);
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();
	const {image, userName, coalition} = useUserInfos();

	useEffect(() => {
		socket?.on('getNotif', (data) => {
			console.log('NOTIF', data);
			setNotifications(notifications + 1);
		});
	}, [socket]);

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

	const handlePlay = () => {
		setIsOpen(!isOpen);
		setPopup({toggle: !popup.toggle});
	};

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
				{notifications > 0 && <S.NotifCounter>{notifications}</S.NotifCounter>}
			</div>
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
								<F.Text weight="500">{coalition.coalition}</F.Text>
							</Link>
						</S.User__Infos>
					</>
				</S.User>
				<hr className="first-hr" />
				<S.LinksContainer>
					{/* PLAY */}
					<S.PopupButton onClick={handlePlay}>
						<Play />
						<F.Text weight="500">Play</F.Text>
					</S.PopupButton>
					{/* CHAT */}
					<Link to="/chat" onClick={toggleDrop} style={{position: 'relative'}}>
						<Chat />
						<F.Text weight="500">Chat</F.Text>
						{/* <S.NotifCounter>5</S.NotifCounter> //todo */}
					</Link>
					{/* LEADERBOARD */}
					<Link to="/leaderboard" onClick={toggleDrop}>
						<Leaderboard />
						<F.Text weight="500">Leaderboard</F.Text>
					</Link>
					{/* DASHBOARD */}
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
						{/* <S.NotifCounter>5</S.NotifCounter> //todo */}
					</Link>
				</S.LinksContainer>
				<hr className="second-hr" />
				<S.LinksContainer>
					{/* SETTINGS */}
					<Link to="/settings" onClick={toggleDrop}>
						<Settings />
						<F.Text weight="500">Settings</F.Text>
					</Link>
					{/* LOGOUT */}
					<S.PopupButton onClick={handleLogout}>
						<Logout />
						<F.Text weight="500">Logout</F.Text>
					</S.PopupButton>
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
