import SocketContext from 'contexts/Socket/Context';
import {ClientEvents, ServerEvents} from 'pages/Game/events/game.events';
import {
	PropsWithChildren,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';
import {TCallback} from 'types/models';
import LobbyContext, {
	LobbyReducer,
	defaultLobbyContextState,
	LobbyContextProvider,
} from './Lobby.context';

export interface ILobbyContextComponentProps extends PropsWithChildren {}

const LobbyContextComponent: React.FunctionComponent<
	ILobbyContextComponentProps
> = (props) => {
	const {children} = props;
	const {socket} = useContext(SocketContext).SocketState;

	const [LobbyState, LobbyDispatch] = useReducer(
		LobbyReducer,
		defaultLobbyContextState
	);

	useEffect(() => {
		if (LobbyState.status === ('accepted' || 'declined')) {
			socket?.emit(ClientEvents.InvitationResponse, {
				status: LobbyState.status,
				lobbyId: LobbyState.lobbyId,
			});
            const close = setTimeout(() => {
                LobbyDispatch({type: 'update_status', payload: ''});
                clearTimeout(close);
            }, 4_000)
		}
	}, [LobbyState.status]);

	useEffect(() => {
		socket?.on(ServerEvents.InvitedToLobby, (data) => {
			LobbyDispatch({type: 'update_status', payload: 'invited'});
			LobbyDispatch({type: 'update_lobbyId', payload: data.invitation.lobby});
		});
		return () => {
			socket?.off(ServerEvents.InvitedToLobby);
		};
	}, [socket]);

	return (
		<LobbyContextProvider value={{LobbyState, LobbyDispatch}}>
			{children}
		</LobbyContextProvider>
	);
};

export default LobbyContextComponent;
