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
import {openNotification} from 'helpers/openNotification';

interface IProps {
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}

enum ETypes {
	ACHIEVEMENT = 'success',
	FRIEND_REQUEST = 'info',
	FRIEND_ACCEPT = 'success',
	FRIEND_DENY = 'error',
	REMOVE = 'error',
	MESSAGE = 'info',
	BANNED = 'error',
	KICKED = 'info',
	ADMIN = 'info',
}

const Navbar = ({setTheme}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const [notifications, setNotifications] = useState<INotification[]>([]);

	useEffect(() => {
		socket?.emit(
			ClientSocialEvents.GetNotifications,
			(notifications: INotification[]) => {
				setNotifications(notifications);
			}
		);
	}, []);

	useEffect(() => {
		socket?.on(ServerSocialEvents.ReceiveNotif, (notifData: INotification) => {
			openNotification(
				ETypes[notifData.type as keyof typeof ETypes],
				`${notifData.message}`,
				'topRight'
			);
			socket?.emit(
				ClientSocialEvents.GetNotifications,
				(notifications: INotification[]) => {
					setNotifications(notifications);
				}
			);
		});

		return () => {
			socket?.off(ServerSocialEvents.ReceiveNotif);
		};
	}, [socket]);

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
				<NotificationCenter
					notifications={notifications}
					setNotifications={setNotifications}
				/>
				<S.Divider />
				<Dropdown />
			</S.Menu>
		</S.StyledNav>
	);
};

export default Navbar;
