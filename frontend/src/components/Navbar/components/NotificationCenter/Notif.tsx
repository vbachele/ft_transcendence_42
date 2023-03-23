import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';
import {INotification} from 'types/models';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {formatDistanceToNowStrict} from 'date-fns';

interface IProps {
	notif: INotification;
}

const Notif = ({notif}: IProps) => {
	const sender = useFetchUserByName(notif.sender);
	const date = new Date(notif.createdAt);
	const formattedDate: string = formatDistanceToNowStrict(date, {
		addSuffix: true,
	});

	let link: string;
	if (notif.type === 'FRIEND_REQUEST') {
		link = '/social';
	}

	return (
		<S.Notif>
			<div style={{display: 'flex', gap: '8px'}}>
				<S.NotifLink to={`dashboard/${notif.sender}`}>
					<img src={sender.data?.image} />
				</S.NotifLink>
				<S.NotifLink className="message" to={`social`}>
					{notif.message}
				</S.NotifLink>
			</div>

			<F.Subtitle>{formattedDate}</F.Subtitle>
		</S.Notif>
	);
};

export default Notif;
