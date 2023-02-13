import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './add.svg';

interface IProps {
	id: number;
}

function AddFriend({id}: IProps) {
	return (
		<button>
			<Icon />
			<F.Text>Add friend</F.Text>
		</button>
	);
}

export default AddFriend;
