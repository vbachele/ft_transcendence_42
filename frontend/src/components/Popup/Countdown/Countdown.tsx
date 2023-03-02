import Popup from '../components/Popup/Popup';
import {useContext, useEffect, useState} from 'react';
import FireGif from '../components/FireGif/FireGif';
import {Text} from '../../../styles/font.styles';
import SocketContext from '../../../contexts/Socket/Context';
import {ClientGameEvents} from '../../../events/game.events';

function Countdown() {
	const [countdown, setCountdown] = useState(3);
	const {socket} = useContext(SocketContext).SocketState;

	useEffect(() => {
		const timeout = setInterval(() => {
			if (countdown) setCountdown(countdown - 1);
		}, 1_000);
		return () => {
			clearTimeout(timeout);
		};
	}, [countdown]);

	if (!countdown) {
		socket?.emit(ClientGameEvents.Ready);
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
