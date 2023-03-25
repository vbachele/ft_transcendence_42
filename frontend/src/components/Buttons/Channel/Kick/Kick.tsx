import {GiArrowhead} from 'react-icons/gi';
import * as F from 'styles/font.styles';

interface IProps {
	onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

function Kick({onClick}: IProps) {
	return (
		<button onClick={onClick}>
			<GiArrowhead style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Kick</F.Text>
		</button>
	);
}

export default Kick;
