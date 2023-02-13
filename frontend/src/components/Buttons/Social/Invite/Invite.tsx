import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './invite.svg';

interface IProps {
	id: number;
}

function Invite({id}: IProps) {
	return (
		<button>
			<Icon />
			<F.Text>Invite to play</F.Text>
		</button>
	);
}

export default Invite;
