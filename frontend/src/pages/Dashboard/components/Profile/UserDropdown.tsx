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

interface IProps {
	user: IUser;
}

const UserDropdown = ({user}: IProps) => {
	const {userName} = useUserInfos();
	const {data: friends} = useFetchFriendsOf(userName.userName);
	const myself: Boolean = userName.userName === user.name;
	const navigate = useNavigate();

	const redirectToHome = () => {
		navigate('/');
	};

	const items: MenuProps['items'] = [
		{
			label: (
				<>
					{!isUserIn(friends, user) && (
						<S.OptionButton>
							<AddFriend user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: '0',
		},
		{
			label: (
				<S.OptionButton>
					<Message user={user.name} />
				</S.OptionButton>
			),
			key: '1',
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
			key: '2',
		},
	];

	return (
		<S.DropdownContainer>
			{!myself && (
				<Dropdown trigger={['click']} placement="bottomLeft" menu={{items}}>
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
