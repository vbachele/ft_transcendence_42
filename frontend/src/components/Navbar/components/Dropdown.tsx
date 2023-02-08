import {useContext} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'assets/default-avatar.png';

import {ReactComponent as Watch} from '../assets/watch.svg';
import {ReactComponent as Chat} from '../assets/chat.svg';
import {ReactComponent as Leaderboard} from '../assets/leaderboard.svg';
import {ReactComponent as Dashboard} from '../assets/dashboard.svg';
import {ReactComponent as Friends} from '../assets/social.svg';
import {ReactComponent as Settings} from '../assets/settings.svg';
import {ReactComponent as Logout} from '../assets/logout.svg';
import useComponentVisible from 'hooks/useComponentVisible';
import * as S from './Dropdown.styles';
import * as F from 'styles/font.styles';

import UserContext from 'contexts/User/userContent';
import {ToggleDrop} from './ToggleDrop';
import Play from 'components/Buttons/Menu/Play';

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
	const userContext = useContext(UserContext);
	const {
		ref: dropRef,
		isComponentVisible: isOpen,
		setIsComponentVisible: setIsOpen,
	} = useComponentVisible(false);

	const toggleDrop = () => {
		setIsOpen(!isOpen);
	};

	if (isOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflowY = 'auto';
	}

	return (
		<S.Container ref={dropRef}>
			<ToggleDrop toggle={toggleDrop} isOpen={isOpen} />
			<img className="avatar" src={Avatar} onClick={toggleDrop} />
			<S.DropdownContainer
				initial={false}
				animate={isOpen ? 'open' : 'closed'}
				variants={menuVariants}
				transition={menuTransition}
			>
				{/* PROFILE */}
				<S.User>
					<>
						<Link to="/dashboard/:id" onClick={toggleDrop}>
							<img src={Avatar} />
						</Link>
						<S.User__Infos>
							<Link to="/dashboard/:id" onClick={toggleDrop}>
								<F.H5>Louisnfr</F.H5>
							</Link>
							<Link
								to="/leaderboard"
								state={{selectedOption: 'Federation', rank: 5}}
								onClick={toggleDrop}
							>
								<F.Text weight="400">Federation</F.Text>
							</Link>
						</S.User__Infos>
					</>
				</S.User>
				<hr className="first-hr" />
				<S.LinksContainer>
					{/* PLAY */}
					<Play toggle={toggleDrop} />
					{/* SPECTATE */}
					<Link to="/spectate" onClick={toggleDrop}>
						<Watch />
						<F.Text weight="400">Spectate</F.Text>
					</Link>
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
					<Link to={`/dashboard/:id`} onClick={toggleDrop}>
						<Dashboard />
						<F.Text weight="400">My Statistics</F.Text>
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
					<Link to="/logout" onClick={toggleDrop}>
						<Logout />
						<F.Text weight="400">Log Out</F.Text>
					</Link>
				</S.LinksContainer>
			</S.DropdownContainer>
		</S.Container>
	);
};

export default Dropdown;
