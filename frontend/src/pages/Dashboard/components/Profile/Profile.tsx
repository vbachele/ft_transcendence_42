import getRanks from 'helpers/getRanks';
import ActivityStatus from 'components/ActivityStatus';
import {IUser} from 'types/models';
import * as S from './Profiles.styles';
import * as F from 'styles/font.styles';

import UserDropdown from './UserDropdown';

interface IProps {
	user: IUser;
}

const Profile = ({user}: IProps) => {
	const {global, coalition} = getRanks(user);
	let checkRanks: boolean = false;

	if (global + coalition) {
		checkRanks = true;
	}

	return (
		<S.Profile coalition={user.coalition}>
			<S.Avatar src={user.image} />
			<S.VDiv className="name">
				<F.H1>{user.name}</F.H1>
				<ActivityStatus state={user.status} />
				<UserDropdown user={user} />
			</S.VDiv>

			{checkRanks && (
				<S.VDiv className="ranks-div">
					<S.VDivLink to="/leaderboard" state={{selectedOption: 'All'}}>
						<F.H1 className="rank"># {global}</F.H1>
						<F.H4>Global</F.H4>
					</S.VDivLink>
					<S.VDivLink
						to="/leaderboard"
						state={{selectedOption: user.coalition}}
					>
						<F.H1 className="rank"># {coalition}</F.H1>
						<F.H4>{user.coalition}</F.H4>
					</S.VDivLink>
				</S.VDiv>
			)}
		</S.Profile>
	);
};

export default Profile;
