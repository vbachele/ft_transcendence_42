import {useState} from 'react';
import {useTheme} from 'styled-components';
import {IUser} from 'types/models';
import ActivityStatus from 'components/ActivityStatus';
import {Divider, Drawer} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import {ReactComponent as Block} from '../assets/block.svg';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';
import {Link} from 'react-router-dom';
import ViewProfile from 'components/Buttons/Social/ViewProfile';
import Invite from 'components/Buttons/Social/Invite';
import Message from 'components/Buttons/Social/Message';
import RemoveFriend from 'components/Buttons/Social/RemoveFriend';
import AddFriend from 'components/Buttons/Social/AddFriend';
import BlockUser from 'components/Buttons/Social/BlockUser';
import AdminRights from 'components/Buttons/Channel/AdminRights';
import Mute from 'components/Buttons/Channel/Mute';
import Ban from 'components/Buttons/Channel/Ban';

interface IProps {
	friend: IUser;
}

function Friend({friend}: IProps) {
	const [open, setOpen] = useState(false);
	const theme = useTheme();

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<S.Friend onClick={showDrawer}>
				<img className="avatar" src={friend.image} />
				<div style={{textAlign: 'left'}}>
					<F.H5>{friend.name}</F.H5>
					<ActivityStatus state={friend.status} />
				</div>
			</S.Friend>
			<Drawer
				headerStyle={{display: 'none'}}
				drawerStyle={{backgroundColor: theme.colors.main}}
				placement="right"
				width={window.innerWidth <= 768 ? '100%' : 424}
				closable={true}
				onClose={onClose}
				open={open}
			>
				<S.DrawerTitle>
					<F.H3>{friend.name}</F.H3>
					<Close onClick={onClose} />
				</S.DrawerTitle>
				<S.FriendDetails>
					<img className="drawer__avatar" src={friend.image} />
					<ActivityStatus state={friend.status} />
				</S.FriendDetails>
				<Divider style={{backgroundColor: '#bbbbbb'}} />
				<S.FriendOptions>
					<ViewProfile id={1} />
					<Invite id={1} />
					<Message id={1} />
					<AddFriend id={1} />
					<RemoveFriend id={1} />
					<BlockUser id={1} />
					<Mute id={1} />
					<Ban id={1} />
				</S.FriendOptions>
			</Drawer>
		</>
	);
}

export default Friend;
