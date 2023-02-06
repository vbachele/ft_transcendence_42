import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './mute.svg';

interface IProps {
	id: number;
}

function Mute({id}: IProps) {
	return (
		<button>
			<Icon />
			<F.Text>Mute</F.Text>
		</button>
	);
}

export default Mute;
