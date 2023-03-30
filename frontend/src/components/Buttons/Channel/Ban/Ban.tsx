import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './ban.svg';
import {useKickUser} from '../../../../hooks/chat/useKickUser';
import { ILobby } from 'contexts/Chat/context';

interface IProps {
	username: string;
	lobby: ILobby;
}

function Ban({username, lobby}: IProps) {
	const {kickUser} = useKickUser(username, lobby, 'ban');

	return (
		<button onClick={kickUser}>
			<Icon style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Ban</F.Text>
		</button>
	);
}

export default Ban;
