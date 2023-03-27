import {useState} from 'react';
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

const Dropdown = () => {
	const [logout, setLogout] = useState(false);
	const {popup, setPopup} = usePopup();
	const {image, userName} = useUserInfos();

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
			</div>
			{isOpen && (
				<S.DropdownContainer>
					<S.User to={`/dashboard/${userName.userName}`} onClick={toggleDrop}>
						<img src={image.image} />
						<F.H4>{userName.userName}</F.H4>
					</S.User>
					<S.LinksContainer>
						<S.PopupButton onClick={handlePlay}>
							<Play />
							<F.Text weight="500">Play</F.Text>
						</S.PopupButton>
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
						<S.PopupButton onClick={handleLogout}>
							<Logout />
							<F.Text weight="500">Logout</F.Text>
						</S.PopupButton>
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
