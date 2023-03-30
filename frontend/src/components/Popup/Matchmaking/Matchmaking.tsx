import React, {useContext, useEffect, useState} from 'react';
import {PopupButton} from 'styles/buttons.styles';
import {Text} from 'styles/font.styles';
import PopupContext from 'contexts/Popup/Popup';
import Timer from '../components/SearchTimer/InviteTimer';
import Popup from '../components/Popup/Popup';
import FireGif from '../components/FireGif/FireGif';
import SocketContext from '../../../contexts/Socket/context';
import {ClientGameEvents, ServerGameEvents} from '../../../events/game.events';
import {useNavigate} from 'react-router-dom';
import Versus from 'components/Versus';

function Matchmaking({}) {
	const {popup, setPopup} = useContext(PopupContext);
	const [displayVersus, setVersus] = useState(false);
	const {socket} = useContext(SocketContext).SocketState;
	const navigate = useNavigate();

	useEffect(() => {
		socket?.on(ServerGameEvents.GameFound, () => {
			setVersus(true);
			setPopup({toggle: false});
			setTimeout(() => {
				setVersus(false);
				navigate('/game');
			}, 3_000);
		});
		return () => {
			socket?.off(ServerGameEvents.GameFound);
		};
	}, [socket]);

	function onCancel() {
		socket?.emit(ClientGameEvents.CancelSearch);
		setPopup({toggle: false});
	}

	if (popup.toggle)
		return (
			<Popup
				title="Waiting for players"
				headerImage={<FireGif />}
				loadingBar={<Timer />}
				style={{
					width: '300px',
					cursor: 'move',
				}}
				draggable={true}
			>
				<PopupButton
					onClick={onCancel}
					border="1px solid #e5e7eb"
					className="Cancel"
					width="50%"
				>
					<Text weight="500">Cancel</Text>
				</PopupButton>
				{displayVersus ? <Versus animation={'open'} /> : null}
			</Popup>
		);
	else if (displayVersus) return <Versus animation={'close'} />;
	else return null;
}

export default Matchmaking;
