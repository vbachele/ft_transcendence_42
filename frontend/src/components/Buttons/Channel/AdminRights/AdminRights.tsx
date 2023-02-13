import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './admin.svg';

interface IProps {
	id: number;
}

function AdminRights({id}: IProps) {
	return (
		<button>
			<Icon />
			<F.Text>Give administrator rights</F.Text>
		</button>
	);
}

export default AdminRights;
