import {Link} from 'react-router-dom';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './play.svg';

interface IProps {
	toggle?: () => void;
}

function Play({toggle}: IProps) {
	return (
		<Link to="/game" onClick={toggle}>
			<Icon />
			<F.Text weight="400">Play</F.Text>
		</Link>
	);
}

export default Play;
