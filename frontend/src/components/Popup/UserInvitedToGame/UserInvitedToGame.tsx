import React, {useState} from 'react';
import {Text} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import {usePopup} from 'contexts/Popup/Popup';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';
import Popup from '../components/Popup/Popup';


//BACKEND Chercher le nom du user que l'on invite ici
//BACKEND if hasinvited = 1
//BACKEND gerer quand le user envoie l'invitation une invit === passe le user en RED

function UserInvitedToGame() {
	const [showComponent, setShowComponent] = useState(false);
	const {hasInvited, setHasInvited} = usePopup();

	function onCancel() {
		setHasInvited(false);
	}

	return hasInvited ? (
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
	) : null;
}

export default UserInvitedToGame;
