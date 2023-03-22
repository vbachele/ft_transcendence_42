import {useContext, useEffect} from 'react';
import SocketContext from 'contexts/Socket/context';
import {openNotification} from 'helpers/openNotification';
import {ServerSocialEvents} from 'events/social.events';
import {INotification} from 'types/models';

const Notification = () => {
	const {socket} = useContext(SocketContext).SocketState;

	// useEffect(() => {
	// 	socket?.on(ServerSocialEvents.ReceiveNotif, (notifData: INotification) => {
	// 		openNotification('info', `${notifData.message}`, 'topRight');
	// 	});

	// 	return () => {
	// 		socket?.off(ServerSocialEvents.ReceiveNotif);
	// 	};
	// }, [socket]);

	return <></>;
};

export default Notification;
