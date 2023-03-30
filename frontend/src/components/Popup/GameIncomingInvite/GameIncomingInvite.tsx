import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';
import Popup from '../components/Popup/Popup';
import SocketContext from '../../../contexts/Socket/context';
import {ClientEvents} from '../../../events/socket.events';
import {usePopup} from '../../../contexts/Popup/Popup';
import {ServerGameEvents} from '../../../events/game.events';
import {useNavigate, createSearchParams} from 'react-router-dom';
import {useTheme} from 'styled-components';
import {InvitationRequest} from '../../../pages/Game/types/game.type';
import Versus from '../../Versus';
import {useGameContext} from '../../../contexts/Game/context';

function GameIncomingInvite() {
	const theme = useTheme();
	const {socket} = useContext(SocketContext).SocketState;
	const {invited, setInvited} = usePopup();
	const timeout = useRef<NodeJS.Timeout>();
	const navigate = useNavigate();
	const [displayGameIntro, setDisplayGameIntro] = useState(false);
	const [request, setRequest] = useState<InvitationRequest | undefined>();
	const GameDispatch = useGameContext().GameDispatch;

	useEffect(() => {
		socket?.on(ServerGameEvents.Invitation, (data: InvitationRequest) => {
			console.info(`Invitation received`, data);
			setRequest(data);
			setInvited(true);
		});
		socket?.on(ServerGameEvents.InvitationCancelled, () => {
			console.info(`Invitation cancelled`);
			setRequest(undefined);
			setInvited(false);
		});
		return () => {
			socket?.off(ServerGameEvents.Invitation);
			socket?.off(ServerGameEvents.InvitationCancelled);
		};
	}, [socket]);

	useEffect(() => {
		if (invited) {
			timeout.current = setTimeout(() => {
				dispatchResponse('declined');
				setInvited(false);
			}, 15_000);
		}
	}, [invited]);

	function dispatchResponse(status: string) {
		socket?.emit(ClientEvents.InvitationResponse, {
			status: status,
			lobby: request?.lobbyId,
		});
		console.info(`Invitation response sent`);
		setRequest(undefined);
	}

	function onJoin() {
		clearTimeout(timeout.current);
		GameDispatch({type: 'update_lobby', payload: request?.lobbyId})
		GameDispatch({type: 'update_left_player', payload: request?.leftPlayer})
		GameDispatch({type: 'update_right_player', payload: request?.rightPlayer});
		dispatchResponse('accepted');
		setDisplayGameIntro(true);
		setInvited(false);
		setTimeout(() => {
			setDisplayGameIntro(false);
			navigate('/game');
		}, 3_000);
	}

	function onCancel() {
		clearTimeout(timeout.current);
		dispatchResponse('declined');
		setInvited(false);
	}

	if (invited)
		return (
			<Popup
				title="Join game?"
				subtitle={`${request?.leftPlayer.name} has just invited you`}
				loadingBar={<LoadingBar />}
				stopPropagation={true}
				overlay={true}
			>
				<PopupButton border="1px solid #e5e7eb" onClick={onCancel}>
					<Text weight="500">Cancel</Text>
				</PopupButton>
				<PopupButton backgroundColor={theme.colors.main} onClick={onJoin}>
					<Text weight="500"> JOIN </Text>
				</PopupButton>
			</Popup>
		);
	else if (displayGameIntro) return <Versus animation={'close'} />;
	else return null;
}

export default GameIncomingInvite;
