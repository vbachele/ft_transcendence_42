import {Link} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './profile.svg';

interface IProps {
	user: string;
}

function ViewProfile({user}: IProps) {
	return (
		<Link to={`/dashboard/${user}`}>
			<Icon />
			<F.Text>View Profile</F.Text>
		</Link>
	);
}

export default ViewProfile;
