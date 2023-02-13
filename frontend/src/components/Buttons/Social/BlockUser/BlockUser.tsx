import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './block.svg';

interface IProps {
	id: number;
}

function BlockUser({id}: IProps) {
	return (
		<button>
			<Icon />
			<F.Text>Block</F.Text>
		</button>
	);
}

export default BlockUser;
