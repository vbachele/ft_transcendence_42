import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/logo.svg';
import {ReactComponent as Versus} from 'assets/versus.svg';
import ToggleTheme from './components/ToggleTheme';
import Dropdown from './components/Dropdown/Dropdown';
import {useContext, useEffect, useState} from 'react';
import {ClientSocialEvents, ServerSocialEvents} from 'events/social.events';
import {useUserInfos} from 'contexts/User/userContent';
import NotificationCenter from './components/NotificationCenter/NotificationCenter';
import * as S from './Navbar.styles';
import {INotification} from 'types/models';
import SocketContext from 'contexts/Socket/context';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({setTheme}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName} = useUserInfos();
	// const [bellOpen, setBellOpen] = useState(false);
	const [notifications, setNotifications] = useState<INotification[]>([]);

	useEffect(() => {
		socket?.on(
			ServerSocialEvents.IncomingNotifsRequest,
			(clientNotifs: INotification[]) => {
				setNotifications(clientNotifs);
			}
		);

		return () => {
			socket?.off(ServerSocialEvents.IncomingNotifsRequest);
		};
	}, [socket]);

	useEffect(() => {
		console.log('useeffect notif');
		socket?.emit(ClientSocialEvents.RequestNotifs, {
			senderName: userName.userName,
		});
	}, []);

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
				<NotificationCenter notifications={notifications} />
				<S.Divider />
				<Dropdown />
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;
