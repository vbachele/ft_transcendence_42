import getRanks from 'helpers/getRanks';
import ActivityStatus from 'components/ActivityStatus';
import {IUser} from 'types/models';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';

import UserDropdown from './UserDropdown';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import {useUserInfos} from 'contexts/User/userContent';
import isUserIn from 'helpers/isUserIn';
import {useEffect, useState} from 'react';
import {backend} from 'lib/backend';

import {ReactComponent as WinIcon} from '../../assets/win.svg';
import {ReactComponent as LossIcon} from '../../assets/loss.svg';

interface IProps {
	user: IUser;
}

const Profile = ({user}: IProps) => {
	const {userName} = useUserInfos();
	// const {data: friends} = useFetchFriendsOf(userName.userName);
	const [friendUsers, setFriendUsers] = useState<IUser[]>([]);
	const {global, coalition} = getRanks(user);
	let checkRanks: boolean = false;

	if (global + coalition) {
		checkRanks = true;
	}

	useEffect(() => {
		const fetchFriends = async () => {
			const data = await backend.getFriendsOf(userName.userName);
			if (data) {
				setFriendUsers(data);
			}
		};
		fetchFriends();
	}, [friendUsers]);

	return (
		<S.Profile coalition={user.coalition}>
			<S.Avatar src={user.image} />
			<S.VDiv className="name" isFriend={isUserIn(friendUsers, user.name)}>
				<S.HDiv style={{flexDirection: 'row'}}>
					<F.H1>{user.name}</F.H1>
					{isUserIn(friendUsers, user.name) && <WinIcon />}
				</S.HDiv>
				<ActivityStatus state={user.status} />
				<UserDropdown user={user} />
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
