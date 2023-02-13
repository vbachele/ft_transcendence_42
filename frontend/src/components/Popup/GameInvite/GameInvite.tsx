import React, {useContext, useEffect, useState} from 'react';
import * as S from './GameInvite.styles';
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

//BACKEND Chercher le nom du user qui m'a invite ici
//BACKEND if invited = 1
//BACKEND gerer quand le user recoit une invit === passe le user en RED

const GameInvite = () => {
	const [showComponent, setShowComponent] = useState(false);
	const {invitation, setInvitation} = usePopup();
	const {popup} = usePopup();

	function gameFound() {
		setShowComponent(true);
	}

	//BACKEND Changer par la variable busy du userd
	function guards() {
		if (popup.toggle) return false;
		return true;
	}

	return guards() ? (
		<S.Overlay onClick={(e) => stopPropagation(e)}>
			<S.Container>
				<S.Text>
					<H2>Join game?</H2>
					<Text weight="350" fontSize="1rem">
						Bartholomeow has just invited you
					</Text>
				</S.Text>
				<LoadingBar />
				<S.Button>
					<PopupButton
						onClick={() => setInvitation({invited: false})}
						border="1px solid #e5e7eb"
						className="Cancel"
					>
						<Text weight="500">Cancel</Text>
					</PopupButton>
					<PopupButton
						className="joinInvitation"
						backgroundColor={'#DC4F19'}
						onClick={() => gameFound()}
					>
						<Link to="/login" style={{textDecoration: 'none'}}>
							<Text weight="500"> JOIN </Text>
						</Link>
					</PopupButton>
				</S.Button>
				{showComponent ? <GameFound /> : ''}
			</S.Container>
		</S.Overlay>
	) : null;
};

export default GameInvite;
