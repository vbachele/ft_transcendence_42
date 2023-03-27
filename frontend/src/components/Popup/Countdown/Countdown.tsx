import {useContext, useEffect, useState} from 'react';
import FireGif from '../components/FireGif/FireGif';
import {Text} from '../../../styles/font.styles';
import SocketContext from '../../../contexts/Socket/context';
import {ClientGameEvents} from '../../../events/game.events';
import {useSearchParams} from 'react-router-dom';
import Popup from '../components/Popup/Popup';
import {PopupButton} from '../../../styles/buttons.styles';


function Countdown() {
	const [showPopup, setShowPopup] = useState(true);
	const {socket} = useContext(SocketContext).SocketState;
	const [searchParams] = useSearchParams();

	function setReady() {
		const lobbyId = searchParams.get('lobbyId');
		socket?.emit(ClientGameEvents.Ready, {lobbyId: lobbyId});
		setShowPopup(false);
		searchParams.delete('lobbyId');
	}

	if (!showPopup) return null;

	return (
		<Popup title="Ready to play?" headerImage={<FireGif />} overlay={true}>
			<PopupButton onClick={setReady}>Go!</PopupButton>
		</Popup>
	);
}

export default Countdown;
