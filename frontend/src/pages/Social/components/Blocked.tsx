import {IUser} from 'types/models';
import {ReactComponent as Unblock} from '../assets/block.svg';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';

interface IProps {
	user: IUser;
}

function Blocked({user}: IProps) {
	return (
		<S.Blocked>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<img className="avatar" src={user.image} />
				<F.H5>{user.name}</F.H5>
			</div>
			<button title="Unblock" style={{border: 'none', background: 'none'}}>
				<Unblock />
			</button>
		</S.Blocked>
	);
}

export default Blocked;
