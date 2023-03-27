import {useContext} from 'react';
import * as F from 'styles/font.styles';

import Buttons from 'components/Buttons';
import * as S from '../../Social/Social.styles';
import ActivityStatus from 'components/ActivityStatus';
import {Divider} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import * as C from './containers.styles';
import ChatContext from '../../../contexts/Chat/context';
import Ban from 'components/Buttons/Channel/Ban/Ban';
import Mute from 'components/Buttons/Channel/Mute/Mute';
import AddFriend from 'components/Buttons/Social/AddFriend/AddFriend';
import BlockUser from 'components/Buttons/Social/BlockUser/BlockUser';
import Invite from 'components/Buttons/Social/Invite/Invite';
import RemoveFriend from 'components/Buttons/Social/RemoveFriend/RemoveFriend';
import ViewProfile from 'components/Buttons/Social/ViewProfile/ViewProfile';
import Message from 'components/Buttons/Social/Message/Message';
import Kick from 'components/Buttons/Channel/Kick';
import {useUserInfos} from 'contexts/User/userContent';
import {useKickUser} from '../../../hooks/chat/useKickUser';

function UserPanel() {
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const {userInPanel, activeLobby} = useContext(ChatContext).ChatState;
	const {userName} = useUserInfos();
	const {kickUser} = useKickUser(userInPanel?.name, activeLobby?.id);

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
				<ActivityStatus user={userInPanel} />
			</S.FriendDetails>
			<Divider style={{backgroundColor: '#bbbbbb'}} />
			<S.FriendOptions>
				<ViewProfile user={userInPanel} />
				<Invite user={userInPanel} />
				<Message user={userInPanel.name} />
				<AddFriend user={userInPanel} />
				<RemoveFriend user={userInPanel} />
				<BlockUser user={userInPanel} />
				{activeLobby?.adminName === userName.userName && (
					<>
						<Mute id={1} />
						<Ban id={1} />
						<Kick onClick={kickUser} />
					</>
				)}
			</S.FriendOptions>
		</C.UserPanel>
	);
}

export default UserPanel;
