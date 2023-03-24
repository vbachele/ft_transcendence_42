import {GiArrowhead} from 'react-icons/gi';
import * as F from 'styles/font.styles';

interface IProps {
	id: number;
}

function Kick({id}: IProps) {
	return (
		<button>
			<GiArrowhead style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Kick</F.Text>
		</button>
	);
}

export default Kick;
