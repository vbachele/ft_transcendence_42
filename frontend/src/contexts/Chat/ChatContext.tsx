import {PropsWithChildren, useContext, useEffect, useReducer} from 'react';
import {
	ChatContextProvider,
	ChatReducer,
	defaultChatContextState, ILobby,
} from './chat.context';
import SocketContext from '../Socket/Context';
import {ServerEvents} from '../../events/socket.events';
import {useFetchLobbies} from 'hooks/chat/useFetchLobbies';
import {ServerChatEvents} from '../../events/chat.events';

export interface IChatContextComponentProps extends PropsWithChildren {}

function ChatContextComponent(props: IChatContextComponentProps) {
	const {children} = props;
	const [ChatState, ChatDispatch] = useReducer(
		ChatReducer,
		defaultChatContextState
	);
	const {socket} = useContext(SocketContext).SocketState;
	const lobbies = useFetchLobbies();

	useEffect(() => {
		ChatDispatch({type: 'update_lobby_list', payload: lobbies as Set<ILobby>});
	}, [lobbies]);

	useEffect(() => {
		socket?.on(ServerEvents.AddedToLobby, (data: any) => {
			ChatDispatch({type: 'update_active_lobby', payload: data.lobby});
		});
		socket?.on(ServerChatEvents.LobbyCreated, (data: any) => {
			console.log(`updating lobby list with `, data.lobby);
			ChatDispatch({type: 'add_lobby', payload: data.lobby});
		});
		return () => {
			socket?.off(ServerEvents.AddedToLobby);
			socket?.off(ServerChatEvents.LobbyCreated);
		};
	}, [socket]);

	return (
		<ChatContextProvider value={{ChatState, ChatDispatch}}>
			{children}
		</ChatContextProvider>
	);
}

export default ChatContextComponent;
