import getRanks from 'helpers/getRanks';
import ActivityStatus from 'components/ActivityStatus';
import {IUser} from 'types/models';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {Link} from 'react-router-dom';
import unlockAchievement from 'helpers/unlockAchievement';
import {useUserInfos} from 'contexts/User/userContent';
import {Button, Dropdown, Space} from 'antd';
import type {MenuProps} from 'antd';
import {DownOutlined} from '@ant-design/icons';

interface IProps {
	user: string;
}

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
			<F.Text weight="400" fontSize="14px">
				Block
			</F.Text>
		),
		key: '2',
	},
];

const UserDropdown = ({user}: IProps) => {
	const {userName} = useUserInfos();
	const myself: Boolean = userName.userName === user;

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
