import React, {useContext, useEffect, useState} from 'react';
import * as S from './UserInvitedToGame.styles';
import {Text, H2, Subtitle} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import PopupContext, {usePopup} from 'contexts/Popup/popup';
import {Link} from 'react-router-dom';
import InviteTimer from '../components/LoadingBar/LoadingBar';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';

function stopPropagation(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.stopPropagation();
}

//BACKEND Chercher le nom du user que l'on invite ici
//BACKEND if hasinvited = 1
//BACKEND gerer quand le user envoie l'invitation une invit === passe le user en RED

const UserInvitedToGame = () => {
	const [showComponent, setShowComponent] = useState(false);
	const {hasInvited, setHasInvited} = usePopup();
	const {popup} = usePopup();

	useEffect(() => {
		setTimeout(() => {
			setShowComponent(true);
		}, 10000);
	}, []);

	//BACKEND Changer par la variable busy du userd
	function guards() {
		if (popup.toggle) return false;
		return true;
	}

	return guards() ? (
		<S.Overlay onClick={(e) => stopPropagation(e)}>
			<S.Container>
				<S.Text>
					<H2>Waiting for...</H2>
					<Text weight="350" fontSize="1rem">
						Vbachele to send him to hell
					</Text>
				</S.Text>
				<LoadingBar />
				<S.Button>
					<PopupButton
						onClick={() => setHasInvited({hasInvited: false})}
						border="1px solid #e5e7eb"
						className="Cancel"
					>
						<Text weight="500">Cancel invitation</Text>
					</PopupButton>
				</S.Button>
				{showComponent ? <GameFound /> : ''}
			</S.Container>
		</S.Overlay>
	) : null;
};

export default UserInvitedToGame;
