import {useContext} from 'react';
import Buttons from 'components/Buttons';
import ActivityStatus from 'components/ActivityStatus';
import {Divider} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import ChatContext from 'contexts/Chat/context';
import {useKickUser} from '../../../hooks/chat/useKickUser';
import {useUserInfos} from 'contexts/User/userContent';
import InviteToPlay from 'components/Popup/InviteToPlay/InviteToPlay';
import * as F from 'styles/font.styles';
import * as S from '../../Social/Social.styles';
import * as C from './containers.styles';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import isUserIn from 'helpers/isUserIn';

function UserPanel() {
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const {userInPanel, activeLobby} = useContext(ChatContext).ChatState;
	const {userName} = useUserInfos().userName;
	const {data: friends} = useFetchFriendsOf(userName);

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
				<Buttons.ViewProfile user={userInPanel} />
				{userInPanel.status === 'online' && (
					<Buttons.Invite user={userInPanel} />
				)}
				<Buttons.Message user={userInPanel.name} />
				{userInPanel.status === 'ingame' && (
					<Buttons.Spectate user={userInPanel} />
				)}
				{!isUserIn(friends, userInPanel.name) && <Buttons.AddFriend user={userInPanel} />}
				{isUserIn(friends, userInPanel.name) && <Buttons.RemoveFriend user={userInPanel} />}
				<Buttons.BlockUser user={userInPanel} />
				{activeLobby?.admins &&
					activeLobby?.admins.find((adminName) => adminName === userName) && activeLobby.type === 'channel' && (
						<>
							<Buttons.Mute
								username={userInPanel.name}
								lobby={activeLobby}
							/>
							<Buttons.Ban
								username={userInPanel.name}
								lobby={activeLobby}
							/>
							<Buttons.Kick
								username={userInPanel.name}
								lobby={activeLobby}
							/>
							<Buttons.AdminRights
								username={userInPanel.name}
								lobby={activeLobby}
							/>
						</>
					)}
			</S.FriendOptions>
			<InviteToPlay user={userInPanel} />
		</C.UserPanel>
	);
}

export default UserPanel;
