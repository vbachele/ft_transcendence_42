import {useContext} from 'react';
import SocketContext from 'contexts/Socket/context';
import {INotification} from 'types/models';
import {ClientSocialEvents} from 'events/social.events';
import useComponentVisible from 'hooks/useComponentVisible';
import {ReactComponent as BellOpened} from '../../assets/bell-opened.svg';
import {ReactComponent as BellClosed} from '../../assets/bell-closed.svg';
import {ReactComponent as Close} from 'assets/close.svg';
import Notif from './Notif';
import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';

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
				<S.NotifCenterPanel>
					<S.Title>
						<F.H4>Notifications</F.H4>
					</S.Title>

					<S.SmallScreenButtons>
						{notifications.length > 0 && (
							<button onClick={onClearNotifs}>Clear notifications</button>
						)}
						<button
							className="close"
							onClick={() => {
								setBellOpen(false);
							}}
						>
							<Close />
						</button>
					</S.SmallScreenButtons>

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

					{notifications.length < 1 && (
						<p style={{padding: '1em', textAlign: 'center'}}>
							You have no new notifications
						</p>
					)}
				</S.NotifCenterPanel>
			)}
		</S.Container>
	);
};

export default NotificationCenter;
