import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './ban.svg';

interface IProps {
	id: number;
}

function Ban({id}: IProps) {
	return (
		<button>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Ban</F.Text>
		</button>
	);
}

export default Ban;
