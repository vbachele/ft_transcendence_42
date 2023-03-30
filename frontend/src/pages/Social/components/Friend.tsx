import InviteToPlay from '../../../components/Popup/InviteToPlay/InviteToPlay';
import {ReactComponent as Close} from 'assets/close.svg';
import ActivityStatus from 'components/ActivityStatus';
import {useTheme} from 'styled-components';
import {Divider, Drawer} from 'antd';
import {useState} from 'react';
import {IUser} from 'types/models';
import Buttons from 'components/Buttons';
import * as F from 'styles/font.styles';
import * as S from '../Social.styles';

interface IProps {
	friend: IUser;
	onBlock: (user: IUser) => void;
	onRemove: (user: IUser) => void;
}

function Friend({friend, onBlock, onRemove}: IProps) {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState(friend.status);
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
					<ActivityStatus size="16px" user={friend} updateStatus={setStatus} />
				</div>
			</S.Friend>
			<Drawer
				headerStyle={{display: 'none'}}
				drawerStyle={{backgroundColor: theme.colors.background}}
				placement="right"
				width={window.innerWidth <= 768 ? '100%' : 424}
				closable={true}
				forceRender={true}
				onClose={hideDrawer}
				open={open}
			>
				<S.DrawerTitle>
					<F.H3>{friend.name}</F.H3>
					<Close onClick={hideDrawer} />
				</S.DrawerTitle>
				<S.FriendDetails>
					<img className="drawer__avatar" src={friend.image} />
					<ActivityStatus user={friend} />
				</S.FriendDetails>
				<Divider style={{backgroundColor: '#bbbbbb'}} />
				<S.FriendOptions>
					<Buttons.ViewProfile user={friend} />
					{status === 'online' && <Buttons.Invite name={friend.name} />}
					{status === 'ingame' && <Buttons.Spectate user={friend} />}
					<Buttons.Message user={friend.name} />
					<Buttons.RemoveFriend
						user={friend}
						hideDrawer={hideDrawer}
						onRemove={onRemove}
					/>
					<Buttons.BlockUser
						user={friend}
						hideDrawer={hideDrawer}
						onBlock={onBlock}
					/>
				</S.FriendOptions>
				<InviteToPlay user={friend}/>
			</Drawer>
		</>
	);
}

export default Friend;
