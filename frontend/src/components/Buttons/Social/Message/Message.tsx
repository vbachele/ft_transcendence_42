import {Link} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './message.svg';

interface IProps {
	id: number;
}

function Message({id}: IProps) {
	return (
		<Link to={`/chat/${id}`}>
			<Icon />
			<F.Text>Message</F.Text>
		</Link>
	);
}

export default Message;
