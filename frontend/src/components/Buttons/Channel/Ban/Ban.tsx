import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './ban.svg';
import {useKickUser} from '../../../../hooks/chat/useKickUser';

interface IProps {
	username: string;
	lobbyId: string;
}

function Ban({username, lobbyId}: IProps) {
	const {kickUser} = useKickUser(username, lobbyId, 'ban');

	return (
		<button onClick={kickUser}>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Ban</F.Text>
		</button>
	);
}

export default Ban;
