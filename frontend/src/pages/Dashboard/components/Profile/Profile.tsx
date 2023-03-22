import {useContext, useEffect, useState} from 'react';
import {useUserInfos} from 'contexts/User/userContent';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import ActivityStatus from 'components/ActivityStatus';
import {ReactComponent as FriendIcon} from '../../assets/friend.svg';
import UserDropdown from './UserDropdown';
import getRanks from 'helpers/getRanks';
import isUserIn from 'helpers/isUserIn';
import {IUser} from 'types/models';
import {backend} from 'lib/backend';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import SocketContext from 'contexts/Socket/context';

interface IProps {
	user: IUser;
}

const Profile = ({user}: IProps) => {
	const {userName} = useUserInfos();
	const {socket} = useContext(SocketContext).SocketState;
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [friendUsers, setFriendUsers] = useState<IUser[]>([]);
	const {global, coalition} = getRanks(user);
	let checkRanks: boolean = false;

	if (global + coalition) {
		checkRanks = true;
	}

	const fetchFriends = async () => {
		const data = await backend.getFriendsOf(userName.userName);
		if (data) {
			setFriendUsers(data);
		}
	};

	useEffect(() => {
		fetchFriends();
	}, [dropdownVisible]);

	const [status, setStatus] = useState(user.status);

	useEffect(() => {
		socket?.on('UPDATE_STATUS', (data: any) => {
			if (data.user === user.name) {
				setStatus(data.status);
			}
		});
		return () => {
			socket?.off('UPDATE_STATUS');
		};
	}, [socket]);

	return (
		<S.Profile coalition={user.coalition}>
			<S.Avatar src={user.image} />
			<S.VDiv className="name" isFriend={isUserIn(friendUsers, user.name)}>
				<S.HDiv style={{flexDirection: 'row'}}>
					<F.H1>{user.name}</F.H1>
					{isUserIn(friendUsers, user.name) && <FriendIcon />}
				</S.HDiv>
				<ActivityStatus state={status} />
				<UserDropdown
					user={user}
					status={status}
					friendUsers={friendUsers}
					dropdownVisible={dropdownVisible}
					setDropdownVisible={setDropdownVisible}
				/>
			</S.VDiv>

			{checkRanks && (
				<S.VDiv className="ranks-div">
					<S.VDivLink to="/leaderboard" state={{selectedOption: 'All'}}>
						<F.H1 className="rank"># {global}</F.H1>
						<F.H4>Global</F.H4>
					</S.VDivLink>
					<S.VDivLink
						to="/leaderboard"
						state={{selectedOption: user.coalition}}
					>
						<F.H1 className="rank"># {coalition}</F.H1>
						<F.H4>{user.coalition}</F.H4>
					</S.VDivLink>
				</S.VDiv>
			)}
		</S.Profile>
	);
};

export default Profile;
