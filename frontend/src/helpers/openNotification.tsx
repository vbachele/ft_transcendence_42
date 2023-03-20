import {notification} from 'antd';
import {NotificationPlacement} from 'antd/es/notification/interface';

export const openNotification = (
	type: 'info' | 'success' | 'warning' | 'error',
	message: string,
	placement?: NotificationPlacement
) => {
	notification[type]({
		message: <div style={{marginBottom: -8}}>{message}</div>,
		duration: 2.5,
		placement: placement || 'bottomLeft',
	});
};
