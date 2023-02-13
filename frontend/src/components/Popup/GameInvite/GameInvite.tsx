import React, {useContext, useEffect, useState} from 'react';
import * as S from './GameInvite.styles';
import {Text, H2, Subtitle} from 'styles/font.styles';
import {
	PopupButton,
	PrimaryButton,
	SecondaryButton,
} from 'styles/buttons.styles';
import PopupContext, {usePopup} from 'contexts/Popup/popup';
import {Link} from 'react-router-dom';
import InviteTimer from '../components/LoadingBar/LoadingBar';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';
import SocketContext from 'contexts/Socket/Context';
import {ServerEvents} from 'pages/Game/events/game.events';
import {TCallback} from 'types/models';

function stopPropagation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.stopPropagation();
}

//BACKEND Chercher le nom du user qui m'a invite ici
//BACKEND if invited = 1
//BACKEND gerer quand le user recoit une invit === passe le user en RED

const GameInvite = () => {
	const [showComponent, setShowComponent] = useState(false);
	const {invitation, setInvitation} = usePopup();
	const {popup} = usePopup();
	const {socket} = useContext(SocketContext).SocketState;

	function gameFound() {
		setShowComponent(true);
	}

	socket?.on(ServerEvents.InvitedToLobby, (data: any, callback: TCallback) => {
		console.info(`Invitation to a game received`);
		setInvitation(true);
		// callback({status: 'accepted'});
	});

	//BACKEND Changer par la variable busy du userd
	// function guards() {
	//   if (popup.toggle) return false;
	//   return true;
	// }

	return invitation ? (
		<S.Overlay>
			<S.Container>
				<S.TextContainer>
					<H2>Join game?</H2>
					<Text weight="350" fontSize="1rem">
						Bartholomeow has just invited you
					</Text>
				</S.TextContainer>
				<LoadingBar />
				<S.ButtonContainer>
					<PopupButton
						border="1px solid #e5e7eb"
						onClick={() => {
							setInvitation(false);
						}}
					>
						<Text weight="500">Cancel</Text>
					</PopupButton>
					<PopupButton backgroundColor={'#DC4F19'} onClick={() => gameFound()}>
						<Text weight="500"> JOIN </Text>
					</PopupButton>
				</S.ButtonContainer>
				{showComponent ? <GameFound /> : ''}
			</S.Container>
		</S.Overlay>
	) : null;
};

export default GameInvite;
