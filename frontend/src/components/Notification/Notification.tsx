import {useContext, useEffect} from 'react';
import SocketContext from 'contexts/Socket/Context';
import {openNotification} from 'helpers/notification';
import {ServerSocialEvents} from 'events/social.events';

const Notification = () => {
	const {socket} = useContext(SocketContext).SocketState;

	useEffect(() => {
		socket?.on(ServerSocialEvents.IncomingRequest, (senderName: string) => {
			openNotification(
				'info',
				`${senderName} sent you a friend request`,
				'topRight'
			);
		});

		return () => {
			socket?.off(ServerSocialEvents.IncomingRequest);
		};
	}, [socket]);

	return <></>;
};

export default Notification;
