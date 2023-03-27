import {PropsWithChildren, useContext, useEffect, useReducer} from 'react';
import {
	ChatContextProvider,
	ChatReducer,
	defaultChatContextState,
	ILobby,
} from './context';
import SocketContext from '../Socket/context';
import {ServerEvents} from '../../events/socket.events';
import {useFetchLobbies} from 'hooks/chat/useFetchLobbies';
import {ServerChatEvents} from '../../events/chat.events';

export interface IChatContextComponentProps extends PropsWithChildren {}

/**
 * ChatContextComponent
 * @Description - This component is responsible for providing the ChatContext to the rest of the application.
 * @member ChatState - The current state of the chat context.
 * @member ChatDispatch - The dispatch function for the chat context.
 * @details The chatContext is used to maintain the list of lobbies and the active lobby (the lobby the user is currently in).
 * If you need to add a new property to the chat context, you will need to update {@link ChatContextProvider} and {@link ChatReducer}
 * @consumer - This component can be consumed using the useContext hook {@example useContext(ChatContext).ChatState}.
 * @param props
 * @constructor
 */
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
			socket?.off(ServerChatEvents.KickedFromLobby);
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
