import {Link} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './profile.svg';

interface IProps {
	id: number;
}

function ViewProfile({id}: IProps) {
	return (
		<Link to={`/dashboard/${id}`}>
			<Icon />
			<F.Text>View Profile</F.Text>
		</Link>
	);
}

export default ViewProfile;
