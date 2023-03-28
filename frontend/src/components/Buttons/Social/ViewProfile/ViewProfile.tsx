import {Link} from 'react-router-dom';
import {IUser} from 'types/models';
import {ReactComponent as Icon} from './profile.svg';
import * as F from 'styles/font.styles';

interface IProps {
	user: IUser;
}

function ViewProfile({user}: IProps) {
	return (
		<Link to={`/dashboard/${user.name}`}>
			<Icon />
			<F.Text>View Profile</F.Text>
		</Link>
	);
}

export default ViewProfile;
