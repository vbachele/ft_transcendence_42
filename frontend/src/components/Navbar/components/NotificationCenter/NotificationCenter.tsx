import {useContext, useEffect, useState} from 'react';
import {ClientSocialEvents, ServerSocialEvents} from 'events/social.events';
import {useUserInfos} from 'contexts/User/userContent';
import SocketContext from 'contexts/Socket/Context';
import {ReactComponent as BellOpened} from '../../assets/bell-opened.svg';
import {ReactComponent as BellClosed} from '../../assets/bell-closed.svg';
import Notif from './Notif';
import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';
import useComponentVisible from 'hooks/useComponentVisible';

const NotificationCenter = () => {
	const {socket} = useContext(SocketContext).SocketState;
	const [notifications, setNotifications] = useState<string[]>([]);
	const {userName} = useUserInfos();
	// const [bellOpen, setBellOpen] = useState(false);

	const {
		ref: dropRef,
		isComponentVisible: bellOpen,
		setIsComponentVisible: setBellOpen,
	} = useComponentVisible(false);

	// socket?.emit(ClientSocialEvents.RequestNotifs, {
	// 	senderName: userName.userName,
	// 	receiverName: userName.userName,
	// });

	const onOpenNotifs = () => {
		setBellOpen(!bellOpen);
		socket?.emit(ClientSocialEvents.RequestNotifs, {
			senderName: userName.userName,
			receiverName: userName.userName,
		});
	};

	const onClearNotifs = () => {
		setBellOpen(!bellOpen);
		socket?.emit(ClientSocialEvents.ClearNotifs, {
			senderName: userName.userName,
			receiverName: userName.userName,
		});
		socket?.emit(ClientSocialEvents.RequestNotifs, {
			senderName: userName.userName,
			receiverName: userName.userName,
		});
	};

	useEffect(() => {
		socket?.on(
			ServerSocialEvents.IncomingNotifsRequest,
			(clientNotifs: string[]) => {
				setNotifications(clientNotifs);
			}
		);

		return () => {
			socket?.off(ServerSocialEvents.IncomingNotifsRequest);
		};
	}, [socket]);

	return (
		<S.Container ref={dropRef}>
			{notifications.length > 0 && (
				<S.NotifCounter>{notifications.length}</S.NotifCounter>
			)}
			{bellOpen ? (
				<BellOpened className="bell" onClick={onOpenNotifs} />
			) : (
				<BellClosed className="bell" onClick={onOpenNotifs} />
			)}
			{bellOpen && (
				<S.PanelContainer>
					<F.H4>Notifications</F.H4>
					<hr />
					{notifications.map((notif) => (
						<Notif notif={notif} />
					))}
					<button onClick={onClearNotifs}>Mark as read</button>
				</S.PanelContainer>
			)}
		</S.Container>
	);
};

export default NotificationCenter;
