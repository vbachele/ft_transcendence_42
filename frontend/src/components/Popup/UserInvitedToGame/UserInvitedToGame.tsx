import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import {usePopup} from 'contexts/Popup/Popup';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import GameFound from '../components/GameFound/GameFound';
import Popup from '../components/Popup/Popup';
import {ServerEvents} from '../../../events/socket.events';
import SocketContext from '../../../contexts/Socket/context';
import {createSearchParams, useNavigate} from 'react-router-dom';
import {ILobbyData, IUser} from '../../../types/models';
import {ClientGameEvents} from '../../../events/game.events';

function UserInvitedToGame({user}: {user: IUser}) {
	const [showComponent, setShowComponent] = useState(false);
	const {socket} = useContext(SocketContext).SocketState;
	const {hasInvited, setHasInvited} = usePopup();
	const [response, setResponse] = useState('');
	const navigate = useNavigate();
	const [lobby, setLobby] = useState<ILobbyData>();

	useEffect(() => {
		socket?.on(ServerEvents.InvitationResponse, (data) => {
			console.info(`Invitation response - [${data.response}]`);
			console.log(`Lobby data `, data.lobby);
			setLobby(data.lobby);
			setResponse(data.response);
		});
		return () => {
			socket?.off(ServerEvents.InvitationResponse);
		};
	}, [socket]);

	useEffect(() => {
		if (response === 'accepted') {
			setShowComponent(true);
			const close = setTimeout(() => {
				setShowComponent(false);
				setHasInvited(false);
				setResponse('');
				clearTimeout(close);
				navigate({
					pathname: '/game',
					search: createSearchParams({
						lobbyId: lobby!.id,
					}).toString(),
				});
			}, 4_000);
		} else if (response === 'declined') {
			setHasInvited(false);
			setResponse('');
		}
		setLobby(undefined);
	}, [response]);

	function onCancel() {
		socket?.emit(ClientGameEvents.CancelInvitation, {
			lobbyId: lobby?.id,
			invitedClientName: user.name,
		});
		setHasInvited(false);
	}

	if (!hasInvited) {
		return null;
	}

	return (
		<Popup
			title="Waiting for..."
			subtitle={`${user.name} to send him to hell`}
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
