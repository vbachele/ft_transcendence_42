import getRanks from 'helpers/getRanks';
import ActivityStatus from 'components/ActivityStatus';
import {IUser} from 'types/models';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {Link} from 'react-router-dom';
import unlockAchievement from 'helpers/unlockAchievement';
import {useUserInfos} from 'contexts/User/userContent';
import {Button, Dropdown} from 'antd';
import type {MenuProps} from 'antd';

interface IProps {
	user: string;
}

const items: MenuProps['items'] = [
	{
		label: <a>1st menu item</a>,
		key: '0',
	},
	{
		label: <a>2nd menu item</a>,
		key: '1',
	},
	{
		label: '3rd menu item',
		key: '2',
	},
];

const UserDropdown = ({user}: IProps) => {
	const {userName, setUserName, achievements} = useUserInfos();
	const myself: Boolean = userName.userName === user;

	return (
		<>
			{!myself && (
				<Dropdown trigger={['click']} menu={{items}} placement="bottomLeft">
					<Button size="small" style={{marginTop: '16px', width: '96px'}}>
						Options
					</Button>
				</Dropdown>
			)}
		</>
	);
};

export default UserDropdown;
