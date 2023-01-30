import {useState} from 'react';
import {useTheme} from 'styled-components';
import {IUser} from 'types/models';
import ActivityStatus from 'components/ActivityStatus';
import {Divider, Drawer} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';
import {Link} from 'react-router-dom';

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
				className="drawer"
				headerStyle={{display: 'none'}}
				drawerStyle={{backgroundColor: theme.colors.main}}
				placement="right"
				width="30%"
				closable={true}
				onClose={onClose}
				open={open}
			>
				<S.StyledDrawer>
					<S.DrawerTitle>
						<F.H3>{friend.name}</F.H3>
						<Close onClick={onClose} />
					</S.DrawerTitle>
					<Divider style={{backgroundColor: '#bbbbbb'}} />
					<S.FriendDetails>
						<img className="drawer__avatar" src={friend.image} />
						<ActivityStatus state={friend.status} />
					</S.FriendDetails>
					<Divider style={{backgroundColor: '#bbbbbb'}} />
					<S.DrawerOptions>
						<Link to="/dashboard/:id">View Profile</Link>
						<button>Invite to play</button>
						<button>Chat</button>
						<button>Remove from friends</button>
						<button>Block</button>
					</S.DrawerOptions>
				</S.StyledDrawer>
			</Drawer>
		</>
	);
}

export default Friend;
