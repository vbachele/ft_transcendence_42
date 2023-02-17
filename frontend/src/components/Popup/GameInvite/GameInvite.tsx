import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';
import Popup from '../components/Popup/Popup';
import LobbyContext from 'contexts/Lobby/Lobby.context';

const GameInvite = () => {
	const LobbyDispatch = useContext(LobbyContext).LobbyDispatch;
	const [showComponent, setShowComponent] = useState(false);
	const {status} = useContext(LobbyContext).LobbyState;

	const renderCounter = useRef(0);
	renderCounter.current = ++renderCounter.current;
	console.log(`User Invite has loaded [${renderCounter.current}] times`);

	function onJoin() {
		setShowComponent(true);
		LobbyDispatch({type: 'update_status', payload: 'accepted'});
		const close = setTimeout(() => {
			setShowComponent(false);
			clearTimeout(close);
		}, 4_000);
	}

	function onCancel() {
		LobbyDispatch({type: 'update_status', payload: 'declined'});
	}

	return status ? (
		<Popup
			title="Join game?"
			subtitle="Bartholomeow has just invited you"
			loadingBar={<LoadingBar />}
			stopPropagation={true}
			overlay={true}
		>
			<PopupButton border="1px solid #e5e7eb" onClick={onCancel}>
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
