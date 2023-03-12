import {IUser} from 'types/models';
import {ReactComponent as Unblock} from '../assets/block.svg';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';

interface IProps {
	user: IUser;
	onUnblock: (user: IUser) => void;
}

function Blocked({user, onUnblock}: IProps) {
	const {userName} = useUserInfos();

	const handleClick = () => {
		backend.unblockUser(userName.userName, user.name).then(() => {
			onUnblock(user);
		});
	};

	return (
		<S.Blocked>
			<div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
				<img className="avatar" src={user.image} />
				<F.H5>{user.name}</F.H5>
			</div>
			<button
				onClick={handleClick}
				title="Unblock"
				style={{border: 'none', background: 'none'}}
			>
				<Unblock />
			</button>
		</S.Blocked>
	);
}

export default Blocked;
