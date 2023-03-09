import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import {useUserInfos} from 'contexts/User/userContent';
import {Dropdown, Space} from 'antd';
import type {MenuProps} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import BlockUser from 'components/Buttons/Social/BlockUser';

interface IProps {
	user: string;
}

const UserDropdown = ({user}: IProps) => {
	const {userName} = useUserInfos();
	const myself: Boolean = userName.userName === user;

	const items: MenuProps['items'] = [
		{
			label: (
				<F.Text weight="400" fontSize="14px">
					Add Friend
				</F.Text>
			),
			key: '0',
		},
		{
			label: (
				<F.Text weight="400" fontSize="14px">
					Message
				</F.Text>
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
