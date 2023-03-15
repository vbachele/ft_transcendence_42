import {useState} from 'react';
import {useTheme} from 'styled-components';
import {IUser} from 'types/models';
import ActivityStatus from 'components/ActivityStatus';
import {Divider, Drawer} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import {ReactComponent as Block} from '../assets/block.svg';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';
import ViewProfile from 'components/Buttons/Social/ViewProfile';
import Invite from 'components/Buttons/Social/Invite';
import Message from 'components/Buttons/Social/Message';
import RemoveFriend from 'components/Buttons/Social/RemoveFriend';
import BlockUser from 'components/Buttons/Social/BlockUser';
import UserInvitedToGame from '../../../components/Popup/UserInvitedToGame/UserInvitedToGame';
import Spectate from 'components/Buttons/Social/Spectate';

interface IProps {
	friend: IUser;
	onBlock: (user: IUser) => void;
	onRemove: (user: IUser) => void;
}

function Friend({friend, onBlock, onRemove}: IProps) {
	const [open, setOpen] = useState(false);
	const theme = useTheme();

	const showDrawer = () => {
		setOpen(true);
	};

	const hideDrawer = () => {
		setOpen(false);
	};

	return (
		<>
			<S.Friend onClick={showDrawer}>
				<img className="avatar" src={friend.image} />
				<div style={{textAlign: 'left'}}>
					<F.H5>{friend.name}</F.H5>
					<ActivityStatus size="16px" state={friend.status} />
				</div>
			</S.Friend>
			<Drawer
				headerStyle={{display: 'none'}}
				drawerStyle={{backgroundColor: theme.colors.main}}
				placement="right"
				width={window.innerWidth <= 768 ? '100%' : 424}
				closable={true}
				onClose={hideDrawer}
				open={open}
			>
				<S.DrawerTitle>
					<F.H3>{friend.name}</F.H3>
					<Close onClick={hideDrawer} />
				</S.DrawerTitle>
				<S.FriendDetails>
					<img className="drawer__avatar" src={friend.image} />
					<ActivityStatus state={friend.status} />
				</S.FriendDetails>
				<Divider style={{backgroundColor: '#bbbbbb'}} />
				<S.FriendOptions>
					<ViewProfile user={friend.name} />
					{friend.status === 'online' && <Invite id={friend.name} />}
					{friend.status === 'ingame' && <Spectate user={friend.name} />}
					<Message user={friend.name} />
					<RemoveFriend
						user={friend}
						hideDrawer={hideDrawer}
						onRemove={onRemove}
					/>
					<BlockUser user={friend} hideDrawer={hideDrawer} onBlock={onBlock} />
				</S.FriendOptions>
				<UserInvitedToGame />
			</Drawer>
		</>
	);
}

export default Friend;
