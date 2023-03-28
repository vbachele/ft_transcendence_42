import {useContext} from 'react';
import * as F from 'styles/font.styles';

import Buttons from 'components/Buttons';
import * as S from '../../Social/Social.styles';
import ActivityStatus from 'components/ActivityStatus';
import {Divider} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import * as C from './containers.styles';
import ChatContext from 'contexts/Chat/context';
import {useKickUser} from '../../../hooks/chat/useKickUser';
import {useUserInfos} from 'contexts/User/userContent';
import UserInvitedToGame from 'components/Popup/UserInvitedToGame/UserInvitedToGame';

function UserPanel() {
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const {userInPanel, activeLobby} = useContext(ChatContext).ChatState;
	const {userName} = useUserInfos().userName;

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
			<S.FriendDetails >
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
				{/*{userInPanel.status === 'online' && <Invite name={userInPanel.name} />}*/}
				<Buttons.Invite name={userInPanel.name} />
				<Buttons.Message user={userInPanel.name} />
				{/*{userInPanel.status === 'ingame' && <Spectate user={userInPanel.name} />}*/}
				<Buttons.AddFriend user={userInPanel} />
				<Buttons.RemoveFriend user={userInPanel} />
				<Buttons.BlockUser user={userInPanel} />
				{activeLobby?.admins &&
					activeLobby?.admins.find((adminName) => adminName === userName) && (
						<>
							<Buttons.Mute
								username={userInPanel.name}
								lobbyId={activeLobby?.id}
							/>
							<Buttons.Ban
								username={userInPanel.name}
								lobbyId={activeLobby?.id}
							/>
							<Buttons.Kick
								username={userInPanel.name}
								lobbyId={activeLobby?.id}
							/>
							<Buttons.AdminRights
								username={userInPanel.name}
								lobbyId={activeLobby?.id}
							/>
						</>
					)}
			</S.FriendOptions>
			<UserInvitedToGame user={userInPanel} />
		</C.UserPanel>
	);
}

export default UserPanel;
