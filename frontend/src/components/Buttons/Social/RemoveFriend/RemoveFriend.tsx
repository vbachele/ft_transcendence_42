import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './remove.svg';

interface IProps {
	id: number;
}

function RemoveFriend({id}: IProps) {
	return (
		<button>
			<Icon />
			<F.Text>Remove friend</F.Text>
		</button>
	);
}

export default RemoveFriend;
