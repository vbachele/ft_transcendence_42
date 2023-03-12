import {useEffect, useState} from 'react';
import {IUser} from 'types/models';
import {Divider, Input} from 'antd';
import Friend from './components/Friend';
import * as S from './Social.styles';
import * as F from 'styles/font.styles';
import compareStatus from 'helpers/compareStatus';
import Blocked from './components/Blocked';
import filterByName from 'helpers/filterByName';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import {useUserInfos} from 'contexts/User/userContent';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';
import {backend} from 'lib/backend';

const {Search} = Input;

function Social() {
	const [search, setSearch] = useState('');
	const {userName} = useUserInfos();
	const {data: friends} = useFetchFriendsOf(userName.userName);
	const {data: blocked} = useFetchBlockedOf(userName.userName);
	const [friendUsers, setFriendUsers] = useState<IUser[]>([]);
	const [blockedUsers, setBlockedUsers] = useState<IUser[]>([]);

	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleUnblock = (user: IUser) => {
		setBlockedUsers((prevBlockedUsers) =>
			prevBlockedUsers.filter((blockedUser) => blockedUser.name !== user.name)
		);
	};

	const handleBlock = (user: IUser) => {
		setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, user]);
		setFriendUsers((prevFriends) =>
			prevFriends.filter((friend) => friend.name !== user.name)
		);
	};

	const handleRemove = (user: IUser) => {
		setFriendUsers((prevFriends) =>
			prevFriends.filter((friend) => friend.name !== user.name)
		);
	};

	useEffect(() => {
		if (blocked) {
			setBlockedUsers(blocked);
		}
		if (friends) {
			setFriendUsers(friends);
		}
	}, [blocked, friends]);

	return (
		<S.Container>
			<Search
				placeholder="Search a user"
				size="large"
				onChange={onSearch}
				style={{
					width: '250px',
				}}
				enterButton
			/>
			<F.H3>
				Friends -{' '}
				{friendUsers &&
					friendUsers.filter((friend) => filterByName(friend, search)).length}
			</F.H3>
			<S.UserContainer>
				{friendUsers &&
					friendUsers
						.sort(compareStatus)
						.filter((friend) => filterByName(friend, search))
						.map((friend: IUser) => (
							<Friend
								friend={friend}
								key={friend.id}
								onBlock={handleBlock}
								onRemove={handleRemove}
							/>
						))}
			</S.UserContainer>
			<Divider style={{visibility: 'hidden'}} />
			<F.H3>
				Blocked -{' '}
				{blockedUsers &&
					blockedUsers.filter((blocked) => filterByName(blocked, search))
						.length}
			</F.H3>
			<S.UserContainer>
				{blockedUsers &&
					blockedUsers
						.filter((user) => filterByName(user, search))
						.map((user: IUser) => (
							<Blocked user={user} key={user.id} onUnblock={handleUnblock} />
						))}
			</S.UserContainer>
		</S.Container>
	);
}

export default Social;
