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
import PendingSent from './components/PendingSent';
import PendingReceived from './components/PendingReceived';
import Blocked from './components/Blocked';
import * as S from './Social.styles';

const {Search} = Input;

const isEmpty = (users: IUser[]): boolean => !users || users.length === 0;

function Social() {
	const {userName} = useUserInfos();
	const [search, setSearch] = useState('');

	const {data: friends} = useFetchFriendsOf(userName.userName);
	const {data: blocked} = useFetchBlockedOf(userName.userName);
	const {sentPendings, receivedPendings} = useFetchPendingsOf(
		userName.userName
	);
	const [friendUsers, setFriendUsers] = useState<IUser[]>([]);
	const [blockedUsers, setBlockedUsers] = useState<IUser[]>([]);
	const [pendingsSent, setPendingsSent] = useState<IUser[]>([]);
	const [pendingsReceived, setPendingsReceived] = useState<IUser[]>([]);

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
		setPendingsSent((prevPendings) =>
			prevPendings.filter((pending) => pending.name !== user.name)
		);
	};

	const handleAccept = (user: IUser) => {
		setFriendUsers((prevFriendUsers) => [...prevFriendUsers, user]);
		setPendingsReceived((prevPendings) =>
			prevPendings.filter((pending) => pending.name !== user.name)
		);
	};

	const handleDeny = (user: IUser) => {
		setPendingsReceived((prevPendings) =>
			prevPendings.filter((pending) => pending.name !== user.name)
		);
		setPendingsSent((prevPendings) =>
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
		if (sentPendings) {
			setPendingsSent(sentPendings);
		}
		if (receivedPendings) {
			setPendingsReceived(receivedPendings);
		}
	}, [blocked, sentPendings, receivedPendings, friends]);

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
					{isEmpty(friendUsers) && (
						<Empty className="empty" description="No friends" />
					)}
				</S.StyledPanel>

				<S.StyledPanel
					header={`Pending - ${
						pendingsSent.filter((user) => filterByName(user, search)).length +
						pendingsReceived.filter((user) => filterByName(user, search)).length
					}`}
					key="PENDING"
					empty={isEmpty(pendingsSent) && isEmpty(pendingsReceived)}
				>
					{pendingsSent &&
						pendingsSent
							.filter((user) => filterByName(user, search))
							.map((user: IUser) => (
								<PendingSent
									user={user}
									key={user.name}
									onRemove={handleDeny}
								/>
							))}
					{pendingsReceived &&
						pendingsReceived
							.filter((user) => filterByName(user, search))
							.map((user: IUser) => (
								<PendingReceived
									user={user}
									key={user.name}
									onAccept={handleAccept}
									onDeny={handleDeny}
								/>
							))}
					{isEmpty(pendingsReceived) && isEmpty(pendingsSent) && (
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
					{isEmpty(blockedUsers) && (
						<Empty className="empty" description="No blocked users" />
					)}
				</S.StyledPanel>
			</S.StyledCollapse>
		</S.Container>
	);
}

export default Social;
