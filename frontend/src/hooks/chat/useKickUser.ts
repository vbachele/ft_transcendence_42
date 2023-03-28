import ChatContext from 'contexts/Chat/context';
import {ClientChatEvents, ServerChatEvents} from 'events/chat.events';
import React, {useContext, useState} from 'react';
import SocketContext from '../../contexts/Socket/context';

export function useKickUser(
	nameToKick: string,
	lobbyName: string,
	type: 'kick' | 'ban',
) {
	const {socket} = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;

	const kickUser = (event: React.MouseEvent) => {
		event.preventDefault();
		socket?.emit(ClientChatEvents.KickUser, {
			nameToKick: nameToKick,
			lobbyId: lobbyName,
			type: type,
		});
		ChatDispatch({type: 'update_user_panel', payload: false});
	};

	return {kickUser};
}
