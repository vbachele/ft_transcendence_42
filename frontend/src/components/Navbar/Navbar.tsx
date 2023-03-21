import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/logo.svg';
import {ReactComponent as Versus} from 'assets/versus.svg';
import ToggleTheme from './components/ToggleTheme';
import Dropdown from './components/Dropdown/Dropdown';
import {useContext, useEffect, useState} from 'react';
import SocketContext from 'contexts/Socket/Context';
import {ClientSocialEvents, ServerSocialEvents} from 'events/social.events';
import {useUserInfos} from 'contexts/User/userContent';
import NotificationCenter from './components/NotificationCenter/NotificationCenter';
import * as S from './Navbar.styles';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setTheme}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName} = useUserInfos();
	const [bellOpen, setBellOpen] = useState(false);

	return (
		<S.StyledNav id="navbar">
			<Link to="/">
				<S.Brand>
					<Logo className="logo" />
					<Versus className="versus" />
				</S.Brand>
			</Link>
			<S.Menu>
				<ToggleTheme setTheme={setTheme} />
				<S.Divider />
				<NotificationCenter />
				<S.Divider />
				<Dropdown />
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;
