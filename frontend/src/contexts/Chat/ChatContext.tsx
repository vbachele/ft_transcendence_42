import {PropsWithChildren, useContext, useEffect, useReducer} from 'react';
import {
	ChatContextProvider,
	ChatReducer,
	defaultChatContextState,
} from './chat.context';
import SocketContext from '../Socket/Context';
import {ServerEvents} from '../../events/socket.events';
import {useFetchLobbies} from 'hooks/chat/useFetchLobbies';

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
		ChatDispatch({type: 'update_lobby_list', payload: lobbies});
	}, [lobbies]);

	useEffect(() => {
		socket?.on(ServerEvents.AddedToLobby, (data: any) => {
			ChatDispatch({type: 'update_active_lobby', payload: data.lobby});
		});
		return () => {
			socket?.off(ServerEvents.AddedToLobby);
		};
	}, [socket]);

	return (
		<ChatContextProvider value={{ChatState, ChatDispatch}}>
			{children}
		</ChatContextProvider>
	);
}

export default ChatContextComponent;
