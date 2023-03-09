import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import {useUserInfos} from 'contexts/User/userContent';
import {Dropdown, Space} from 'antd';
import type {MenuProps} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import BlockUser from 'components/Buttons/Social/BlockUser';
import AddFriend from 'components/Buttons/Social/AddFriend';
import Message from 'components/Buttons/Social/Message';

interface IProps {
	user: string;
}

const UserDropdown = ({user}: IProps) => {
	const {userName} = useUserInfos();
	const myself: Boolean = userName.userName === user;

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
					<Message user={user} />
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
					<Space className="antd-space" size={8}>
						<F.Text weight="500">Options</F.Text>
						<DownOutlined />
					</Space>
				</Dropdown>
			)}
		</>
	);
};

export default UserDropdown;
