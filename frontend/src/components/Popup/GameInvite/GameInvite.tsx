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

interface ILobbyData {
	id: string;
	type: string;
}

const GameInvite = () => {
	const [showComponent, setShowComponent] = useState(false);
	const {socket} = useContext(SocketContext).SocketState;
	const {invited, setInvited} = usePopup();
	const [lobby, setLobby] = useState<ILobbyData | null>(null);
	const timeout = useRef<NodeJS.Timeout>();
	const navigate = useNavigate();

	const renderCounter = useRef(0);
	renderCounter.current = ++renderCounter.current;
	console.log(`User Invite has loaded [${renderCounter.current}] times`);

	useEffect(() => {
		socket?.on(ServerGameEvents.Invitation, (data) => {
			console.info(`Invitation received`);
			console.log(`Lobby data: `, data);
			setLobby(data.lobby);
			setInvited(true);
		});
		socket?.on(ServerGameEvents.InvitationCancelled, () => {
			console.info(`Invitation cancelled`);
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
		console.log(`lobby is `, lobby);
		socket?.emit(ClientEvents.InvitationResponse, {
			status: status,
			lobby: lobby,
		});
		console.info(`Invitation response sent`);
		setLobby(null);
	}

	function onJoin() {
		clearTimeout(timeout.current);
		dispatchResponse('accepted');
		setShowComponent(true);
		const close = setTimeout(() => {
			setShowComponent(false);
			setInvited(false);
			clearTimeout(close);
			navigate({
				pathname: '/game',
				search: createSearchParams({
					lobbyId: lobby!.id,
				}).toString(),
			});
		}, 4_000);
	}

	function onCancel() {
		clearTimeout(timeout.current);
		dispatchResponse('declined');
		setInvited(false);
	}

	if (!invited) {
		return null;
	}

	return (
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
			<PopupButton backgroundColor={'#dc4f19'} onClick={onJoin}>
				<Text weight="500"> JOIN </Text>
			</PopupButton>
			{showComponent ? <GameFound /> : ''}
		</Popup>
	);
};

export default GameInvite;
