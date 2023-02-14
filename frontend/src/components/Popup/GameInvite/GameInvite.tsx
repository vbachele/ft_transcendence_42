import React, {useContext, useState} from 'react';
import {Text} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import {usePopup} from 'contexts/Popup/Popup';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';
import SocketContext from 'contexts/Socket/Context';
import {ServerEvents} from 'pages/Game/events/game.events';
import {TCallback} from 'types/models';
import Popup from '../components/Popup/Popup';

function stopPropagation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.stopPropagation();
}

//BACKEND Chercher le nom du user qui m'a invite ici
//BACKEND if invited = 1
//BACKEND gerer quand le user recoit une invit === passe le user en RED

const GameInvite = () => {
	const [showComponent, setShowComponent] = useState(false);
	const [invitationStatus, setInvitationStatus] = useState('')
	const {invitation, setInvitation} = usePopup();
	const {socket} = useContext(SocketContext).SocketState;

	socket?.on(ServerEvents.InvitedToLobby, (data: any, callback: TCallback) => {
		console.info(`Invitation to a game received`);
		setInvitationStatus('')
		setInvitation(true);
		if (invitationStatus === 'accepted')
			callback({status: 'accepted'});
		else if (invitationStatus === 'declined')
			callback({status: 'declined'})
	});

	function onJoin() {
		setShowComponent(true);
		setInvitationStatus('accepted');
	}

	function onCancel() {
		setInvitation(false);
		setInvitationStatus('declined')
	}

	return invitation ? (
		<Popup
			title="Join game?"
			subtitle="Bartholomeow has just invited you"
			loadingBar={<LoadingBar />}
			stopPropagation={true}
			overlay={true}
		>
			<PopupButton
				border="1px solid #e5e7eb"
				onClick={() => {
					setInvitation(false);
				}}
			>
				<Text weight="500">Cancel</Text>
			</PopupButton>
			<PopupButton backgroundColor={'#DC4F19'} onClick={onJoin}>
				<Text weight="500"> JOIN </Text>
			</PopupButton>
			{showComponent ? <GameFound /> : ''}
		</Popup>
	) : null;
};

export default GameInvite;
