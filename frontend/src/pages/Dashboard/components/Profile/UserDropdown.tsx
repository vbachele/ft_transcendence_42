import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {DownOutlined} from '@ant-design/icons';
import {MenuProps} from 'antd';
import {Dropdown} from 'antd';
import {IUser} from 'types/models';
import {backend} from 'lib/backend';
import {useUserInfos} from 'contexts/User/userContent';
import isUserIn from 'helpers/isUserIn';
import Buttons from 'components/Buttons';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';

interface IProps {
	user: IUser;
	friendUsers: IUser[];
	dropdownVisible: boolean;
	setDropdownVisible: (value: React.SetStateAction<boolean>) => void;
}

const UserDropdown = ({
	user,
	friendUsers,
	dropdownVisible,
	setDropdownVisible,
}: IProps) => {
	const {userName} = useUserInfos();
	const myself: Boolean = userName.userName === user.name;
	const navigate = useNavigate();

	const redirectToHome = () => {
		navigate('/');
	};

	const handleDropdownVisibleChange = (visible: boolean) => {
		setDropdownVisible(visible);
	};

	const items: MenuProps['items'] = [
		{
			label: (
				<>
					{!isUserIn(friendUsers, user.name) && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Buttons.AddFriend user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'ADD',
		},
		{
			label: (
				<S.OptionButton>
					<Buttons.Message user={user.name} />
				</S.OptionButton>
			),
			key: 'MESSAGE',
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user.name) && user.status === 'online' && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Buttons.Invite id={user.name} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'INVITE',
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user.name) && user.status === 'ingame' && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Buttons.Spectate user={user.name} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'SPECTATE',
		},
		{
			label: (
				<>
					{isUserIn(friendUsers, user.name) && (
						<S.OptionButton
							onClick={() => {
								setDropdownVisible(false);
							}}
						>
							<Buttons.RemoveFriend user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'REMOVE',
		},
		{
			label: (
				<>
					{true && (
						<S.OptionButton onClick={redirectToHome}>
							<Buttons.BlockUser user={user} />
						</S.OptionButton>
					)}
				</>
			),
			key: 'BLOCK',
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
