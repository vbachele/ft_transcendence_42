import { ILobby } from 'contexts/Chat/context';
import {GiArrowhead} from 'react-icons/gi';
import * as F from 'styles/font.styles';
import {useKickUser} from '../../../../hooks/chat/useKickUser';

interface IProps {
	username: string;
	lobby: ILobby;
}

function Kick({username, lobby}: IProps) {
	const {kickUser} = useKickUser(username, lobby, 'kick');

	return (
		<button onClick={kickUser}>
			<GiArrowhead style={{fill: '#ff4d4f'}} />
			<F.Text style={{color: '#ff4d4f'}}>Kick</F.Text>
		</button>
	);
}

export default Kick;
