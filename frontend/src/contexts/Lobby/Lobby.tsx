import SocketContext from 'contexts/Socket/Context';
import {ClientEvents, ServerEvents} from 'pages/Game/events/game.events';
import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';
import { GameEvents } from './events';
import LobbyContext, {
	LobbyReducer,
	defaultLobbyContextState,
	LobbyContextProvider,
} from './lobby.context';
import { LobbyService } from './lobby.service';

export interface ILobbyContextComponentProps extends PropsWithChildren {}

const LobbyContextComponent: React.FunctionComponent<
	ILobbyContextComponentProps
> = (props) => {
	const {children} = props;
	const {socket} = useContext(SocketContext).SocketState;
	const lobbyService = new LobbyService;

	const [LobbyState, LobbyDispatch] = useReducer(
		LobbyReducer,
		defaultLobbyContextState
	);

	useEffect(() => {
		console.log(`New status - [${LobbyState.status}]`)
		if (LobbyState.status)
			lobbyService.handleResponse();
	}, [LobbyState.status]);

	useEffect(() => {
		socket?.on(ServerEvents.InvitedToLobby, (data) => {
			console.info(`Invitation received`);
			LobbyDispatch({type: 'update_type', payload: data.invitation.lobby.type});
			LobbyDispatch({type: 'update_lobbyId', payload: data.invitation.lobby.id});
			LobbyDispatch({type: 'update_status', payload: GameEvents.Invited})
			// lobbyService.handleInvite(data.invitation);
			console.log(LobbyState);
		});
		return () => {
			socket?.off(ServerEvents.InvitedToLobby);
		};
	}, [socket]);

	useEffect(() => {
		socket?.on(ServerEvents.InvitationResponse, (data) => {
			console.info(`Invitation response - [${data.response}]`);
			LobbyDispatch({type: 'update_status', payload: data.response});
		})
		return () => {
			socket?.off(ServerEvents.InvitationResponse)
		}
	}, [socket])

	return (
		<LobbyContextProvider value={{LobbyState, LobbyDispatch}}>
			{children}
		</LobbyContextProvider>
	);
};

export default LobbyContextComponent;
