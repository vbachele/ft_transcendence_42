import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import {usePopup} from 'contexts/Popup/Popup';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';
import Popup from '../components/Popup/Popup';
import LobbyContext from 'contexts/Lobby/lobby.context';
import { GameEvents } from 'contexts/Lobby/events';


//BACKEND Chercher le nom du user que l'on invite ici
//BACKEND if hasinvited = 1
//BACKEND gerer quand le user envoie l'invitation une invit === passe le user en RED

function UserInvitedToGame() {
	const [showComponent, setShowComponent] = useState(false);
	const {status} = useContext(LobbyContext).LobbyState;
	const lobbyDispatch = useContext(LobbyContext).LobbyDispatch;

	function onCancel() {
		lobbyDispatch({type: 'update_status', payload: GameEvents.Declined});
	}

	return (
		<Popup
			title="Waiting for..."
			subtitle="Vbachele to send him to hell"
			loadingBar={<LoadingBar />}
			stopPropagation={true}
			overlay={true}
		>
				<PopupButton
					onClick={onCancel}
					border="1px solid #e5e7eb"
					className="Cancel"
				>
					<Text weight="500">Cancel invitation</Text>
				</PopupButton>
			{showComponent ? <GameFound /> : ''}
		</Popup>
	);
}

export default UserInvitedToGame;
