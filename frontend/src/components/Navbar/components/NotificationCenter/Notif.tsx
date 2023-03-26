import {INotification} from 'types/models';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {formatDistanceToNowStrict} from 'date-fns';
import {useUserInfos} from 'contexts/User/userContent';
import {ReactComponent as Success} from '../../assets/success-badge.svg';
import * as S from './NotificationCenter.styles';
import * as F from 'styles/font.styles';

interface IProps {
	notif: INotification;
}

enum ELinkTypes {
	ACHIEVEMENT = '/dashboard',
	FRIEND_REQUEST = '/social',
	FRIEND_ACCEPT = '/social',
	FRIEND_DENY = '/social',
	REMOVE = '/social',
	MESSAGE = '/chat',
	BANNED = '/',
	KICKED = '/',
	ADMIN = '/',
}

function getLinkOption(notif: INotification, userName: string) {
	switch (notif.type) {
		case 'FRIEND_REQUEST' || 'FRIEND_ACCEPT' || 'FRIEND_DENY' || 'REMOVE':
			return '';
		case 'ACHIEVEMENT':
			return `/${userName}`;
		case 'MESSAGE':
			return '';
		case 'BANNED':
			return '';
		case 'KICKED':
			return '';
		case 'ADMIN':
			return '';
		default:
			return '';
	}
}

const Notif = ({notif}: IProps) => {
	const {userName} = useUserInfos();
	const sender = useFetchUserByName(notif.sender);
	const date = new Date(notif.createdAt);
	const link = ELinkTypes[notif.type as keyof typeof ELinkTypes];
	const linkOption = getLinkOption(notif, userName.userName);
	const formattedDate = formatDistanceToNowStrict(date, {
		addSuffix: true,
	});
	const isAchievement = notif.type === 'ACHIEVEMENT';
	const isSocial =
		notif.type === 'FRIEND_REQUEST' ||
		notif.type === 'FRIEND_ACCEPT' ||
		notif.type === 'FRIEND_DENY' ||
		notif.type === 'REMOVE';
	const isChannel =
		notif.type === 'BANNED' ||
		notif.type === 'KICKED' ||
		notif.type === 'ADMIN';

	return (
		<S.Notif>
			<div style={{display: 'flex', gap: '8px'}}>
				{isSocial && (
					<S.NotifLink to={`dashboard/${notif.sender}`}>
						<img
							src={
								sender.data
									? sender.data?.image
									: 'https://cdn-icons-png.flaticon.com/512/6711/6711603.png'
							}
						/>
					</S.NotifLink>
				)}
				{isAchievement && (
					<S.NotifLink to={`dashboard/${notif.sender}`}>
						<Success />
					</S.NotifLink>
				)}
				<S.NotifLink className="message" to={link + linkOption}>
					{notif.message}
				</S.NotifLink>
			</div>

			<F.Subtitle>{formattedDate}</F.Subtitle>
		</S.Notif>
	);
};

export default Notif;
