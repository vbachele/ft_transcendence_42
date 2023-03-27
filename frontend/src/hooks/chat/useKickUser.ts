import ChatContext from 'contexts/Chat/context';
import { ClientChatEvents, ServerChatEvents } from 'events/chat.events';
import React, {useContext, useState} from "react";
import SocketContext from "../../contexts/Socket/context";

export function useKickUser(nameToKick : string | undefined, lobbyName : string | undefined) {
	const { socket } = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;

	const kickUser = (event: React.MouseEvent) => {
		event.preventDefault();
		socket?.emit(ClientChatEvents.KickUser, {nameToKick: nameToKick, lobbyId: lobbyName});
		ChatDispatch({type: 'update_user_panel', payload: false})
		
		return () => {
			socket?.off(ClientChatEvents.KickUser);
		}
	}

	return { kickUser };
}