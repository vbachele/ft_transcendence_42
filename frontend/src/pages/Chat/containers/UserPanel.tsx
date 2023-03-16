import {Dispatch, SetStateAction} from 'react';
import {ReactComponent as Close} from 'assets/close.svg';
import {IUser} from 'types/models';
import {Divider} from 'antd';
import ActivityStatus from 'components/ActivityStatus';
import Buttons from 'components/Buttons';
import User from 'mocks/Users/players.json';
import * as C from './containers.styles';
import * as S from 'pages/Social/Social.styles';
import * as F from 'styles/font.styles';

interface IProps {
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

const user = Array.from(User.players)[0] as IUser;

function UserPanel({setOpenUserPanel}: IProps) {
	return (
		<C.UserPanel>
			<S.DrawerTitle>
				<F.H3>{user.name}</F.H3>
				<Close onClick={() => setOpenUserPanel(false)} />
			</S.DrawerTitle>
			<S.FriendDetails>
				<img className="drawer__avatar" src={user.image} alt="user avatar" />
				<ActivityStatus state={user.status} />
			</S.FriendDetails>
			<Divider style={{backgroundColor: '#bbbbbb'}} />
			<S.FriendOptions>
				<Buttons.ViewProfile user={user.name} />
				<Buttons.Invite id={user.name} />
				<Buttons.Message user={user.name} />
				<Buttons.AddFriend user={user} />
				<Buttons.RemoveFriend user={user} />
				<Buttons.BlockUser user={user} />
				<Buttons.Mute id={1} />
				<Buttons.Ban id={1} />
			</S.FriendOptions>
		</C.UserPanel>
	);
}

export default UserPanel;
