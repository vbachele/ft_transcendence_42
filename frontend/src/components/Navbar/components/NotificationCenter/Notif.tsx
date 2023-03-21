import {IUser} from 'types/models';
import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';

interface INotification {
	senderName: string;
	channel?: string;
	type:
		| 'ACHIEVEMENT'
		| 'FRIEND_REQUEST'
		| 'FRIEND_ACCEPT'
		| 'FRIEND_DENY'
		| 'BLOCKED'
		| 'MESSAGE'
		| 'BANNED'
		| 'KICKED'
		| 'ADMIN';
}

interface IProps {
	notif: string;
	// type: number;
}

const Notif = ({notif}: IProps) => {
	let link: string;
	if (true) {
		link = '/social';
	}

	return <S.NotifContainer to={link}>{notif}</S.NotifContainer>;
};

export default Notif;
