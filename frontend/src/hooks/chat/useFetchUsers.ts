import {useContext, useEffect, useState} from 'react';
import SocketContext from '../../contexts/Socket/context';
import {IUser} from '../../types/models';
import {ClientChatEvents, ServerChatEvents} from '../../events/chat.events';
import ChatContext from '../../contexts/Chat/context';

export function useFetchLobbyUserList() {
	const {socket} = useContext(SocketContext).SocketState;
	const {activeLobby} = useContext(ChatContext).ChatState;
	const [userList, setUserList] = useState<IUser[]>([]);

	useEffect(() => {
		socket?.emit(ClientChatEvents.FetchUsers, {lobbyId: activeLobby?.id});
		socket?.on(ServerChatEvents.UserList, (data) => {
			setUserList(data.users);
		})

		return () => {
			socket?.off(ServerChatEvents.UserList);
		}
	}, [socket])

	return {userList};

}