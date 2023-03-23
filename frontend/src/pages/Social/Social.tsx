import {useEffect, useState} from 'react';
import {Empty, Input} from 'antd';
import {useUserInfos} from 'contexts/User/userContent';
import {IUser} from 'types/models';
import compareStatus from 'helpers/compareStatus';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import useFetchBlockedOf from 'hooks/useFetchBlockedOf';
import useFetchPendingsOf from 'hooks/useFetchPendingsOf';
import ModalUserSearch from 'pages/Chat/modals/ModalUserSearch';
import Blocked from './components/Blocked';
import Friend from './components/Friend';
import PendingSent from './components/PendingSent';
import PendingReceived from './components/PendingReceived';
import useFetchUsers from 'hooks/useFetchUsers';
import * as Chat from '../Chat/components/components.styles';
import * as F from 'styles/font.styles';
import * as S from './Social.styles';
import isUserIn from 'helpers/isUserIn';
import ModalAddUser from './components/ModalAddUser';
import filterByName from 'helpers/filterByName';

const {Search} = Input;

const isEmptyStr = (users: IUser[]): string => {
	if (!users || users.length === 0) {
		return 'true';
	} else {
		return 'false';
	}
};

const isEmptyBool = (users: IUser[]): boolean => {
	if (!users || users.length === 0) {
		return true;
	} else {
		return false;
	}
};

const isEmptyPendings = (sent: IUser[], reiceved: IUser[]): string => {
	if ((!sent || sent.length === 0) && (!reiceved || reiceved.length === 0)) {
		return 'true';
	} else {
		return 'false';
	}
};

function Social() {
	const {userName} = useUserInfos();
	const {data} = useFetchUsers();
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
	const [displayModal, setDisplayModal] = useState(false);

	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleUnblock = (user: IUser) => {
		setBlockedUsers((prev) =>
			prev.filter((blockedUser) => blockedUser.name !== user.name)
		);
	};

	const handleBlock = (user: IUser) => {
		setBlockedUsers((prev) => [...prev, user]);
		setFriendUsers((prev) =>
			prev.filter((friend) => friend.name !== user.name)
		);
	};

	const handleRemove = (user: IUser) => {
		setFriendUsers((prev) =>
			prev.filter((friend) => friend.name !== user.name)
		);
		setPendingsSent((prev) =>
			prev.filter((pending) => pending.name !== user.name)
		);
	};

	const handleAccept = (user: IUser) => {
		setFriendUsers((prev) => [...prev, user]);
		setPendingsReceived((prev) =>
			prev.filter((pending) => pending.name !== user.name)
		);
	};

	const handleDeny = (user: IUser) => {
		setPendingsReceived((prev) =>
			prev.filter((pending) => pending.name !== user.name)
		);
		setPendingsSent((prev) =>
			prev.filter((pending) => pending.name !== user.name)
		);
	};

	const handleAdd = (user: IUser) => {
		setPendingsSent((prev) => [...prev, user]);
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

	let users: IUser[];
	if (data) {
		users = data
			?.filter((user) => {
				return (
					user.name !== userName.userName &&
					!isUserIn(friendUsers, user.name) &&
					!isUserIn(blockedUsers, user.name) &&
					!isUserIn(pendingsSent, user.name)
				);
			})
			.sort(compareStatus);
	}

	return (
		<S.Container>
			<Search
				placeholder="Search a user"
				size="large"
				value={search}
				onChange={onSearch}
				onSearch={() => setDisplayModal(true)}
				enterButton
				style={{
					width: '250px',
				}}
			/>
			{displayModal && (
				<ModalAddUser
					isModalOpen={displayModal}
					setIsModalOpen={setDisplayModal}
					userList={users!}
					onAdd={handleAdd}
					search={search}
					onSearch={onSearch}
				/>
			)}
			<S.StyledCollapse ghost={true}>
				<S.StyledPanel
					header={`Friends - ${
						friendUsers &&
						friendUsers.filter((user) => filterByName(user, search)).length
					}`}
					key="FRIENDS"
					empty={isEmptyStr(friendUsers)}
				>
					{friendUsers &&
						friendUsers
							.sort(compareStatus)
							.map((user: IUser) => (
								<Friend
									friend={user}
									key={user.name}
									onBlock={handleBlock}
									onRemove={handleRemove}
								/>
							))}
					{isEmptyBool(friendUsers) && (
						<Empty className="empty" description="No friends" />
					)}
				</S.StyledPanel>

				<S.StyledPanel
					header={`Pending - ${
						pendingsSent.filter((user) => filterByName(user, search)).length +
						pendingsReceived.filter((user) => filterByName(user, search)).length
					}`}
					key="PENDING"
					empty={isEmptyPendings(pendingsSent, pendingsReceived)}
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
					{isEmptyBool(pendingsReceived) && isEmptyBool(pendingsSent) && (
						<Empty className="empty" description="No pending invites" />
					)}
				</S.StyledPanel>
				<S.StyledPanel
					header={`Blocked - ${
						blockedUsers &&
						blockedUsers.filter((user) => filterByName(user, search)).length
					}`}
					key="BLOCKED"
					empty={isEmptyStr(blockedUsers)}
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
					{isEmptyBool(blockedUsers) && (
						<Empty className="empty" description="No blocked users" />
					)}
				</S.StyledPanel>
			</S.StyledCollapse>
		</S.Container>
	);
}

export default Social;
