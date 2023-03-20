import {Dispatch, SetStateAction, useContext, useEffect, useRef} from 'react';
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
import User from 'mocks/Users/players.json';
import ActivityStatus from 'components/ActivityStatus';
import {Divider} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import * as C from './containers.styles';
import {IUser} from '../../../types/models';
import ChatContext from '../../../contexts/Chat/context';
import {useUserInfos} from '../../../contexts/User/userContent';
import {backend} from '../../../lib/backend';
import useFetchUserByName from '../../../hooks/useFetchUserByName';

interface IProps {
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

function UserPanel({setOpenUserPanel}: IProps) {
	const {activeLobby} = useContext(ChatContext).ChatState;
	const name = useUserInfos().userName.userName;
	const {data, error}=  useFetchUserByName(directMessageName(activeLobby!.name));

	function directMessageName(lobbyName: string) {
		const displayedName = lobbyName.split('+');
		if (displayedName[0] === name) return displayedName[1];
		else return displayedName[0];
	}

	if (!data) return (
		<div>{error}</div>
	);

	return (
		<C.UserPanel>
			<S.DrawerTitle>
				<F.H3>{data.name}</F.H3>
				<Close onClick={() => setOpenUserPanel(false)} />
			</S.DrawerTitle>
			<S.FriendDetails>
				<img
					className="drawer__avatar"
					src={data.image}
					alt="user avatar"
				/>
				<ActivityStatus state={data.status} />
			</S.FriendDetails>
			<Divider style={{backgroundColor: '#bbbbbb'}} />
			<S.FriendOptions>
				<ViewProfile user={data.name} />
				<Invite id={data.name} />
				<Message user={data.name} />
				<AddFriend user={data} />
				<RemoveFriend user={data} />
				<BlockUser user={data} />
				<Mute id={1} />
				<Ban id={1} />
			</S.FriendOptions>
		</C.UserPanel>
	);
}

export default UserPanel;
