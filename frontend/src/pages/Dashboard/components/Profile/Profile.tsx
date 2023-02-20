import getRanks from 'helpers/getRanks';
import ActivityStatus from 'components/ActivityStatus';
import {IUser} from 'types/models';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';
import {Button, Dropdown} from 'antd';

interface IProps {
	user: IUser;
}

const items = [
	{
		key: '1',
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.antgroup.com"
			>
				Add friend
			</a>
		),
	},
	{
		key: '2',
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.aliyun.com"
			>
				Message
			</a>
		),
	},
	{
		key: '3',
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.luohanacademy.com"
			>
				Block
			</a>
		),
	},
];

const Profile = ({user}: IProps) => {
	const {global, coalition} = getRanks(user);

	return (
		<S.Profile coalition={user.coalition}>
			<S.Avatar src={user.image} />
			<S.VDiv>
				<F.H1>{user.name}</F.H1>
				<ActivityStatus state={user.status} />
				<Dropdown
					trigger={['click']}
					menu={{
						items,
					}}
					placement="bottomLeft"
				>
					<Button size="small" style={{marginTop: '16px'}}>
						Options
					</Button>
				</Dropdown>
			</S.VDiv>

			<S.VDivLink to="/leaderboard" state={{selectedOption: 'All'}}>
				<F.H1 className="rank"># {global}</F.H1>
				<F.H4>Global</F.H4>
			</S.VDivLink>

			<S.VDivLink to="/leaderboard" state={{selectedOption: user.coalition}}>
				<F.H1 className="rank"># {coalition}</F.H1>
				<F.H4>{user.coalition}</F.H4>
			</S.VDivLink>
		</S.Profile>
	);
};

export default Profile;
