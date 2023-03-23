import {IUser} from 'types/models';
import AddFriend from 'components/Buttons/Social/AddFriend/AddFriend';
import * as Chat from 'pages/Chat/components/components.styles';
import * as F from 'styles/font.styles';
import * as S from '../Social.styles';
import {Link} from 'react-router-dom';

interface IProps {
	user: IUser;
	onAdd: (user: IUser) => void;
}

const displayStatus = (params: string) => {
	if (params == 'online')
		return <Chat.PastillePic style={{background: '#2FE837'}} />;
	else if (params == 'offline')
		return <Chat.PastillePic style={{background: '#9CA3AF'}} />;
	else return <Chat.PastillePic style={{background: '#EB5757'}} />;
};

function User({user, onAdd}: IProps) {
	return (
		<S.User>
			<S.UserLink to={`/dashboard/${user.name}`}>
				<div style={{width: '48px', height: '48px', position: 'relative'}}>
					<Chat.ProfilePic src={user.image} />
					{displayStatus(user.status)}
				</div>
				<F.Text>{user.name}</F.Text>
			</S.UserLink>
			<div
				onClick={() => {
					onAdd(user);
				}}
			>
				<AddFriend user={user} />
			</div>
		</S.User>
	);
}

export default User;
