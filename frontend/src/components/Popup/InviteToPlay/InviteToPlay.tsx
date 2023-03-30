import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'styles/font.styles';
import {PopupButton} from 'styles/buttons.styles';
import {usePopup} from 'contexts/Popup/Popup';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import Popup from '../components/Popup/Popup';
import {ServerEvents} from '../../../events/socket.events';
import SocketContext from '../../../contexts/Socket/context';
import {useNavigate} from 'react-router-dom';
import {ILobbyData, IUser} from '../../../types/models';
import {ClientGameEvents} from '../../../events/game.events';
import Versus from '../../Versus';
import {useGameContext} from '../../../contexts/Game/context';
import {InvitationResponse} from '../../../pages/Game/types/game.type';

function InviteToPlay({user}: {user: IUser}) {
	const {socket} = useContext(SocketContext).SocketState;
	const {hasInvited, setHasInvited} = usePopup();
	const [response, setResponse] = useState<InvitationResponse>();
	const navigate = useNavigate();
	const [lobby, setLobby] = useState<ILobbyData | undefined>();
	const [displayGameIntro, setDisplayGameIntro] = useState(false);
	const GameDispatch = useGameContext().GameDispatch;

	useEffect(() => {
		socket?.on(ServerEvents.InvitationResponse, (data: InvitationResponse) => {
			console.info(`Invitation response - `, data);
			if (data.state === 'accepted') {
				GameDispatch({type: 'update_left_player', payload: data.leftPlayer});
				GameDispatch({type: 'update_right_player', payload: data.rightPlayer});
				GameDispatch({type: 'update_lobby', payload: data.lobbyId});
			}
			setResponse(data);
		});
		return () => {
			socket?.off(ServerEvents.InvitationResponse);
		};
	}, [socket]);

	useEffect(() => {
		if (!response) return;
		if (response.state === 'accepted') {
			setDisplayGameIntro(true);
			setHasInvited(false);
			setResponse(undefined);
			setTimeout(() => {
				setDisplayGameIntro(false);
				navigate('/game');
			}, 3_000);
		} else if (response.state === 'declined') {
			setHasInvited(false);
			setResponse(undefined);
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

	if (hasInvited)
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
			</Popup>
		);
	else if (displayGameIntro) return <Versus animation={'close'} />;
	else return null;
}

export default InviteToPlay;
