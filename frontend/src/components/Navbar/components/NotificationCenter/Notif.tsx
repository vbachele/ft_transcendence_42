import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';
import {INotification} from 'types/models';
import {Link} from 'react-router-dom';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {formatDistanceToNow} from 'date-fns';

interface IProps {
	notif: INotification;
}

const Notif = ({notif}: IProps) => {
	const sender = useFetchUserByName(notif.sender);
	const test = new Date(notif.createdAt);
	const formattedDate: string = formatDistanceToNow(test);

	let link: string;
	console.log('wrwrw');

	if (true) {
		link = '/social';
	}

	return (
		<S.Notif>
			<S.NotifLink className="sender" to={`dashboard/${notif.sender}`}>
				<img src={sender.data?.image} />
				{notif.sender}
			</S.NotifLink>

			<S.NotifLink className="message" to={`social`}>
				{notif.message}{' '}
			</S.NotifLink>

			<F.Subtitle>{formattedDate} ago</F.Subtitle>
		</S.Notif>
	);
};

export default Notif;
