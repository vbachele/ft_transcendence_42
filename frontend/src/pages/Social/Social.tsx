import {useState} from 'react';
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

const {Search} = Input;

function Social() {
	const {userName} = useUserInfos();
	const {data: friends} = useFetchFriendsOf(userName.userName);
	const {data: blocked} = useFetchBlockedOf(userName.userName);
	const [search, setSearch] = useState('');
	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

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
				{friends &&
					friends.filter((friend) => filterByName(friend, search)).length}
			</F.H3>
			<S.UserContainer>
				{friends &&
					friends
						.sort(compareStatus)
						.filter((friend) => filterByName(friend, search))
						.map((friend: IUser) => (
							<Friend friend={friend} key={friend.name} />
						))}
			</S.UserContainer>
			<Divider style={{visibility: 'hidden'}} />
			<F.H3>
				Blocked -{' '}
				{blocked &&
					blocked.filter((blocked) => filterByName(blocked, search)).length}
			</F.H3>
			<S.UserContainer>
				{blocked &&
					blocked
						.filter((user) => filterByName(user, search))
						.map((user: IUser) => <Blocked user={user} key={user.name} />)}
			</S.UserContainer>
		</S.Container>
	);
}

export default Social;
