import {useContext, useEffect, useState} from 'react';
import FireGif from '../components/FireGif/FireGif';
import {Text} from '../../../styles/font.styles';
import SocketContext from '../../../contexts/Socket/context';
import {ClientGameEvents} from '../../../events/game.events';
import {useSearchParams} from 'react-router-dom';
import Popup from '../components/Popup/Popup';

function Countdown() {
	const [countdown, setCountdown] = useState(3);
	const {socket} = useContext(SocketContext).SocketState;
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const timeout = setInterval(() => {
			if (countdown) setCountdown(countdown - 1);
		}, 1_000);
		return () => {
			clearTimeout(timeout);
		};
	}, [countdown]);

	if (!countdown) {
		const lobbyId = searchParams.get('lobbyId');
		socket?.emit(ClientGameEvents.Ready, {lobbyId: lobbyId});
		return null;
	}
	return (
		<Popup title="Game starting in..." headerImage={<FireGif />} overlay={true}>
			<Text style={{color: 'white', fontSize: '4em'}}>
				{countdown.toString()}
			</Text>
		</Popup>
	);
}

export default Countdown;
