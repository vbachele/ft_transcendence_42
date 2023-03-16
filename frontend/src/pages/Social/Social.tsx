import {useEffect, useState} from 'react';
import {IUser} from 'types/models';
import {Empty, Input} from 'antd';
import compareStatus from 'helpers/compareStatus';
import filterByName from 'helpers/filterByName';
import {useUserInfos} from 'contexts/User/userContent';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';
import useFetchPendingsOf from 'hooks/useFetchPendingsOf';
import Friend from './components/Friend';
import Pending from './components/Pending';
import Blocked from './components/Blocked';
import * as S from './Social.styles';

const {Search} = Input;

function isEmpty(users: IUser[]): string {
	if (!users || users.length === 0) {
		return 'true';
	}
	return 'false';
}

function Social() {
	const {userName} = useUserInfos();
	const [search, setSearch] = useState('');
	const {data: friends} = useFetchFriendsOf(userName.userName);
	const {data: blocked} = useFetchBlockedOf(userName.userName);
	const {data: pendings} = useFetchPendingsOf(userName.userName);
	const [friendUsers, setFriendUsers] = useState<IUser[]>([]);
	const [blockedUsers, setBlockedUsers] = useState<IUser[]>([]);
	const [pendingUsers, setPendingUsers] = useState<IUser[]>([]);

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

	const handleAccept = (user: IUser) => {
		setFriendUsers((prevFriendUsers) => [...prevFriendUsers, user]);
		setPendingUsers((prevPendings) =>
			prevPendings.filter((pending) => pending.name !== user.name)
		);
	};

	const handleDeny = (user: IUser) => {
		setPendingUsers((prevPendings) =>
			prevPendings.filter((pending) => pending.name !== user.name)
		);
	};

	useEffect(() => {
		if (blocked) {
			setBlockedUsers(blocked);
		}
		if (friends) {
			setFriendUsers(friends);
		}
		if (pendings) {
			setPendingUsers(pendings);
		}
	}, [blocked, pendings, friends]);

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
			<S.StyledCollapse ghost={true}>
				<S.StyledPanel
					header={`Friends - ${
						friendUsers &&
						friendUsers.filter((user) => filterByName(user, search)).length
					}`}
					key="FRIENDS"
					empty={isEmpty(friendUsers)}
				>
					{friendUsers &&
						friendUsers
							.sort(compareStatus)
							.filter((user) => filterByName(user, search))
							.map((user: IUser) => (
								<Friend
									friend={user}
									key={user.name}
									onBlock={handleBlock}
									onRemove={handleRemove}
								/>
							))}
					{isEmpty(friendUsers) === 'true' && (
						<Empty className="empty" description="No friends" />
					)}
				</S.StyledPanel>
				<S.StyledPanel
					header={`Pending - ${
						pendingUsers &&
						pendingUsers.filter((user) => filterByName(user, search)).length
					}`}
					key="PENDING"
					empty={isEmpty(pendingUsers)}
				>
					{pendingUsers &&
						pendingUsers
							.sort(compareStatus)
							.filter((user) => filterByName(user, search))
							.map((user: IUser) => (
								<Pending
									user={user}
									key={user.name}
									onAccept={handleAccept}
									onDeny={handleDeny}
								/>
							))}
					{isEmpty(pendingUsers) === 'true' && (
						<Empty className="empty" description="No pending invites" />
					)}
				</S.StyledPanel>
				<S.StyledPanel
					header={`Blocked - ${
						blockedUsers &&
						blockedUsers.filter((user) => filterByName(user, search)).length
					}`}
					key="BLOCKED"
					empty={isEmpty(blockedUsers)}
				>
					{blockedUsers &&
						blockedUsers
							.filter((user) => filterByName(user, search))
							.map((user: IUser) => (
								<Blocked
									user={user}
									key={user.name}
									onUnblock={handleUnblock}
								/>
							))}
					{isEmpty(blockedUsers) === 'true' && (
						<Empty className="empty" description="No blocked users" />
					)}
				</S.StyledPanel>
			</S.StyledCollapse>
		</S.Container>
	);
}

export default Social;
