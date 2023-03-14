import {ReactComponent as Deny} from '../assets/deny.svg';
import {ReactComponent as Accept} from '../assets/accept.svg';
import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {notification} from 'antd';
import {IUser} from 'types/models';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';
import {Link} from 'react-router-dom';
import unlockAchievement from 'helpers/unlockAchievement';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';

interface IProps {
	user: IUser;
	onAccept: (user: IUser) => void;
	onDeny: (user: IUser) => void;
}

function Pending({user, onAccept, onDeny}: IProps) {
	const {userName} = useUserInfos();
	const {data: friends} = useFetchFriendsOf(userName.userName); //TODO fetching only userName and not user

	const handleAccept = () => {
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);
		backend.addFriend(user.name, userName.userName);
		backend.addFriend(userName.userName, user.name);
		onAccept(user);

		notification.success({
			message: (
				<div
					style={{marginBottom: -8}}
				>{`${user.name}'s request has been accepted`}</div>
			),
			placement: 'bottom',
			duration: 2.5,
		});

		//TODO move this to backend
		unlockAchievement('ADD', userName.userName);
		unlockAchievement('ADD', user.name);
		if (friends && friends.length + 1 >= 3) {
			unlockAchievement('TEAM', user.name);
			unlockAchievement('TEAM', userName.userName);
		}
	};

	const handleDeny = () => {
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);
		onDeny(user);
		notification.error({
			message: (
				<div
					style={{marginBottom: -8}}
				>{`${user.name}'s request has been denied`}</div>
			),
			placement: 'bottom',
			duration: 2.5,
		});
	};

	return (
		<S.Pending>
			<S.HDivLink to={`/dashboard/${user.name}`}>
				<img className="avatar" src={user.image} />
				<F.H5>{user.name}</F.H5>
			</S.HDivLink>
			<S.HDiv>
				<button
					onClick={handleAccept}
					title="Accept"
					style={{border: 'none', background: 'none'}}
				>
					<Accept className="accept-icon" />
				</button>
				<button
					onClick={handleDeny}
					title="Deny"
					style={{border: 'none', background: 'none'}}
				>
					<Deny className="ignore-icon" />
				</button>
			</S.HDiv>
		</S.Pending>
	);
}

export default Pending;
