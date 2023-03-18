import {ReactComponent as Deny} from '../assets/deny.svg';
import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {notification} from 'antd';
import {IUser} from 'types/models';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';

interface IProps {
	user: IUser;
	onRemove: (user: IUser) => void;
}

function PendingSent({user, onRemove}: IProps) {
	const {userName} = useUserInfos();

	const handleRemove = () => {
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);

		onRemove(user);
		notification.error({
			message: (
				<div
					style={{marginBottom: -8}}
				>{`Friend request to ${user.name} canceled`}</div>
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
					onClick={handleRemove}
					title="Cancel"
					style={{border: 'none', background: 'none'}}
				>
					<Deny className="ignore-icon" />
				</button>
			</S.HDiv>
		</S.Pending>
	);
}

export default PendingSent;
