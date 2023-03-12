import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import {useUserInfos} from 'contexts/User/userContent';
import {Dropdown} from 'antd';
import type {MenuProps} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import BlockUser from 'components/Buttons/Social/BlockUser';
import AddFriend from 'components/Buttons/Social/AddFriend';
import Message from 'components/Buttons/Social/Message';
import {IUser} from 'types/models';

interface IProps {
	user: IUser;
}

const UserDropdown = ({user}: IProps) => {
	const {userName} = useUserInfos();
	const myself: Boolean = userName.userName === user.name;

	const items: MenuProps['items'] = [
		{
			label: (
				<S.OptionButton>
					<AddFriend user={user} />
				</S.OptionButton>
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
				<S.OptionButton>
					<BlockUser user={user} />
				</S.OptionButton>
			),
			key: '2',
		},
	];

	return (
		<>
			{!myself && (
				<Dropdown trigger={['click']} menu={{items}} placement="bottomLeft">
					<div className="antd-space">
						<F.Text weight="500">Options</F.Text>
						<DownOutlined className="dropdown-arrow" />
					</div>
				</Dropdown>
			)}
		</>
	);
};

export default UserDropdown;
