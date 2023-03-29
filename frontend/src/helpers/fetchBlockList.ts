import {useContext} from 'react';
import SocketContext from '../contexts/Socket/context';
import {asyncEmit} from './asyncEmit';
import {ClientChatEvents, ServerChatEvents} from '../events/chat.events';
import {Socket} from 'socket.io-client';

export async function fetchBlockList(client: Socket) {
	try {
		return await asyncEmit(
			client,
			ClientChatEvents.FetchBlockedUsers,
			{},
			ServerChatEvents.BlockedUsers
		);
	} catch (e) {
		console.error(e);
	}
}
