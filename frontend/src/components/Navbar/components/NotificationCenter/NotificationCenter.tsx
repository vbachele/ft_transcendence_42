import {useContext, useEffect, useState} from 'react';
import {ClientSocialEvents, ServerSocialEvents} from 'events/social.events';
import {useUserInfos} from 'contexts/User/userContent';
import {ReactComponent as BellOpened} from '../../assets/bell-opened.svg';
import {ReactComponent as BellClosed} from '../../assets/bell-closed.svg';
import Notif from './Notif';
import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import useComponentVisible from 'hooks/useComponentVisible';
import {INotification} from 'types/models';
import SocketContext from 'contexts/Socket/context';

interface IProps {
	notifications: INotification[];
	setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

const NotificationCenter = ({notifications, setNotifications}: IProps) => {
	const {socket} = useContext(SocketContext).SocketState;
	const {
		ref: dropRef,
		isComponentVisible: bellOpen,
		setIsComponentVisible: setBellOpen,
	} = useComponentVisible(false);

	const onOpenNotifs = () => {
		setBellOpen(!bellOpen);
	};

	const onClearNotifs = () => {
		socket?.emit(ClientSocialEvents.ClearNotifs);
		socket?.emit(
			ClientSocialEvents.GetNotifications,
			(notifications: INotification[]) => {
				setNotifications(notifications);
			}
		);
	};

	if (bellOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflowY = 'auto';
	}

	return (
		<S.Container ref={dropRef}>
			<div onClick={onOpenNotifs} style={{cursor: 'pointer'}}>
				{notifications.length > 0 && (
					<S.NotifCounter>{notifications.length}</S.NotifCounter>
				)}
				{bellOpen ? (
					<BellOpened className="bell" />
				) : (
					<BellClosed className="bell" />
				)}
			</div>
			{bellOpen && (
				<S.NotifCenterContainer>
					<div style={{backgroundColor: '#dc4f19'}}>
						<F.H4>Notifications</F.H4>
					</div>
					<S.SmallScreenButtons>
						{notifications.length > 0 && (
							<button className="top-button" onClick={onClearNotifs}>
								Clear notifications
							</button>
						)}
						<button
							className="top-button"
							onClick={() => {
								setBellOpen(false);
							}}
						>
							Close
						</button>
					</S.SmallScreenButtons>
					<hr />
					{notifications.length > 0 && (
						<S.NotifsContainer>
							{notifications
								.slice()
								.reverse()
								.map((notif) => (
									<Notif notif={notif} key={notif.id} />
								))}
						</S.NotifsContainer>
					)}
					{notifications.length > 0 && (
						<button className="bottom-button" onClick={onClearNotifs}>
							Clear notifications
						</button>
					)}
					{notifications.length < 1 && <p>You have no new notifications</p>}
				</S.NotifCenterContainer>
			)}
		</S.Container>
	);
};

export default NotificationCenter;
