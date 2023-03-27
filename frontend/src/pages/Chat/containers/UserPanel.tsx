import {useContext} from 'react';
import * as F from 'styles/font.styles';
import ViewProfile from 'components/Buttons/Social/ViewProfile';
import Invite from 'components/Buttons/Social/Invite';
import Message from 'components/Buttons/Social/Message';
import AddFriend from 'components/Buttons/Social/AddFriend';
import RemoveFriend from 'components/Buttons/Social/RemoveFriend';
import BlockUser from 'components/Buttons/Social/BlockUser';
import Mute from 'components/Buttons/Channel/Mute';
import Ban from 'components/Buttons/Channel/Ban';
import * as S from '../../Social/Social.styles';
import ActivityStatus from 'components/ActivityStatus';
import {Divider} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import * as C from './containers.styles';
import ChatContext from 'contexts/Chat/context';
import UserInvitedToGame from 'components/Popup/UserInvitedToGame/UserInvitedToGame';
import Spectate from '../../../components/Buttons/Social/Spectate/Spectate';

function UserPanel() {
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const {userInPanel} = useContext(ChatContext).ChatState;

	if (!userInPanel) return null;

	return (
		<C.UserPanel>
			<S.DrawerTitle>
				<F.H3>{userInPanel.name}</F.H3>
				<Close
					onClick={() =>
						ChatDispatch({type: 'update_user_panel', payload: false})
					}
				/>
			</S.DrawerTitle>
			<S.FriendDetails>
				<img
					className="drawer__avatar"
					src={userInPanel.image}
					alt="user avatar"
				/>
				<ActivityStatus state={userInPanel.status} />
			</S.FriendDetails>
			<Divider style={{backgroundColor: '#bbbbbb'}} />
			<S.FriendOptions>
				<ViewProfile user={userInPanel.name} />
				{/*{userInPanel.status === 'online' && <Invite name={userInPanel.name} />}*/}
				{/*{userInPanel.status === 'ingame' && <Spectate user={userInPanel.name} />}*/}
				<Invite name={userInPanel.name} />
				<Message user={userInPanel.name} />
				<AddFriend user={userInPanel} />
				<RemoveFriend user={userInPanel} />
				<BlockUser user={userInPanel} />
				<Mute id={1} />
				<Ban id={1} />
			</S.FriendOptions>
			<UserInvitedToGame user={userInPanel}/>
		</C.UserPanel>
	);
}

export default UserPanel;
