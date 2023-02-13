import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './ban.svg';

interface IProps {
	id: number;
}

function Ban({id}: IProps) {
	return (
		<button>
			<Icon />
			<F.Text>Ban</F.Text>
		</button>
	);
}

export default Ban;
