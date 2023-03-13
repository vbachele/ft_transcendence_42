import {useNavigate} from 'react-router-dom';
import {useUserInfos} from 'contexts/User/userContent';
import {DownOutlined} from '@ant-design/icons';
import {Menu, MenuProps} from 'antd';
import {Dropdown} from 'antd';
import {IUser} from 'types/models';
import BlockUser from 'components/Buttons/Social/BlockUser';
import AddFriend from 'components/Buttons/Social/AddFriend';
import Message from 'components/Buttons/Social/Message';
import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import isUserIn from 'helpers/isUserIn';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import {useEffect, useState} from 'react';
import {backend} from 'lib/backend';
import RemoveFriend from 'components/Buttons/Social/RemoveFriend';
import Spectate from 'components/Buttons/Social/Spectate';
import Invite from 'components/Buttons/Social/Invite';

interface IProps {
	user: IUser;
}

const UserDropdown = ({user}: IProps) => {
	const {userName} = useUserInfos();
	const myself: Boolean = userName.userName === user.name;
	const [friendUsers, setFriendUsers] = useState<IUser[]>([]);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const navigate = useNavigate();

	const handleDropdownVisibleChange = (visible: boolean) => {
		setDropdownVisible(visible);
	};

	const redirectToHome = () => {
		navigate('/');
	};

	useEffect(() => {
		const fetchFriends = async () => {
			const data = await backend.getFriendsOf(userName.userName);
			if (data) {
				setFriendUsers(data);
			}
		};
		fetchFriends();
	}, [dropdownVisible]);

	const items: MenuProps['items'] = [
		{
			label: (
				<>
					{!isUserIn(friendUsers, user) && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<AddFriend user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'ADD_USER',
		},

		{
			label: (
				<S.OptionButton>
					<Message user={user.name} />
				</S.OptionButton>
			),
			key: 'MESSAGE',
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user) && user.status === 'online' && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Invite id={user.name} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'INVITE',
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user) && user.status === 'ingame' && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Spectate user={user.name} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'SPECTATE',
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user) && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<RemoveFriend user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'REMOVE_USER',
		},
		{
			label: (
				<>
					{true && (
						<S.OptionButton onClick={redirectToHome}>
							<BlockUser user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'BLOCK_USER',
		},
	];

	return (
		<S.DropdownContainer>
			{!myself && (
				<Dropdown
					trigger={['click']}
					placement="bottomLeft"
					menu={{items}}
					open={dropdownVisible}
					onOpenChange={handleDropdownVisibleChange}
				>
					<div className="antd-space">
						<F.Text weight="500">Options</F.Text>
						<DownOutlined className="dropdown-arrow" />
					</div>
				</Dropdown>
			)}
		</S.DropdownContainer>
	);
};

export default UserDropdown;
