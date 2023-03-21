import {useContext, useEffect, useState} from 'react';
import {ClientSocialEvents, ServerSocialEvents} from 'events/social.events';
import {useUserInfos} from 'contexts/User/userContent';
import SocketContext from 'contexts/Socket/Context';
import {ReactComponent as BellOpened} from '../../assets/bell-opened.svg';
import {ReactComponent as BellClosed} from '../../assets/bell-closed.svg';
import Notif from './Notif';
import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import useComponentVisible from 'hooks/useComponentVisible';
import {INotification} from 'types/models';

interface IProps {
	notifications: INotification[];
}

const NotificationCenter = ({notifications}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName} = useUserInfos();
	const {
		ref: dropRef,
		isComponentVisible: bellOpen,
		setIsComponentVisible: setBellOpen,
	} = useComponentVisible(false);

	console.log(notifications);

	const onOpenNotifs = () => {
		// socket?.emit(ClientSocialEvents.RequestNotifs, {
		// 	senderName: userName.userName,
		// });
		setBellOpen(!bellOpen);
	};

	const onClearNotifs = () => {
		setBellOpen(!bellOpen);
		socket?.emit(ClientSocialEvents.ClearNotifs, {
			senderName: userName.userName,
		});
	};

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
					<S.NotifsContainer>
						{notifications.map((notif) => (
							<Notif notif={notif} key={notif.id} />
						))}
					</S.NotifsContainer>
					<UI.SecondaryButtonSmall onClick={onClearNotifs}>
						Mark as read
					</UI.SecondaryButtonSmall>
				</S.PanelContainer>
			)}
		</S.Container>
	);
};

export default NotificationCenter;
