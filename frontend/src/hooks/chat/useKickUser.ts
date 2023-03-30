import ChatContext, { ILobby } from 'contexts/Chat/context';
import {ClientChatEvents, ServerChatEvents} from 'events/chat.events';
import { ClientSocialEvents } from 'events/social.events';
import { openNotification } from 'helpers/openNotification';
import React, {useContext, useState} from 'react';
import SocketContext from '../../contexts/Socket/context';

export function useKickUser(
	nameToKick: string,
	lobby: ILobby,
	type: 'kick' | 'ban',
) {
	const {socket} = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;
	const kickUser = (event: React.MouseEvent) => {
		event.preventDefault();
		socket?.emit(ClientChatEvents.KickUser, {
			nameToKick: nameToKick,
			lobbyId: lobby.id,
			type: type,
		});

		const word = type === 'kick' ? 'kicked' : 'banned';
		openNotification('info', `${nameToKick} has been ${word} from ${lobby.name}`);
		socket?.emit(ClientSocialEvents.SendNotif, {
			sender: lobby.name,
			receiver: nameToKick,
			type: type === 'kick' ? 'KICKED' : 'BANNED',
		});

		ChatDispatch({type: 'update_user_panel', payload: false});
	};

	return {kickUser};
}
