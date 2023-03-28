import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './mute.svg';

interface IProps {
	id: number;
}

function Mute({id}: IProps) {
	return (
		<button>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Mute</F.Text>
		</button>
	);
}

export default Mute;
