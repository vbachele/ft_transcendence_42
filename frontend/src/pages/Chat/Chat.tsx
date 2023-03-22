import * as C from './containers/containers.styles';
import ChannelBar from './containers/ChannelBar';
import MainField from './containers/MainField';
import UserPanel from './containers/UserPanel';
import React, {useContext} from 'react';
import ChatContext from 'contexts/Chat/context';
import {useResponsiveLayout} from 'hooks/chat/useResponsiveLayout';

/**
 * @name Chat
 * @Description The chat is built around the activeLobby.
 * 	- If there is no active lobby, the user is in the lobby list
 * 	- If there is an active lobby, the user is in the chat room for that lobby.
 * @member ChannelBar - The channel bar is the list of lobbies.
 * @member MainField - The main field is the chat room for the active lobby.
 * @member UserPanel - The user panel displays a list of interactions
 * available with a specific user.
 */
function Chat() {
	const {activeLobby} = useContext(ChatContext).ChatState;
	const {responsive} = useResponsiveLayout();
	const {isOpenUserPanel} = useContext(ChatContext).ChatState;

	if (responsive) {
		return (
			<C.Chat>
				{!activeLobby && <ChannelBar />}
				{!isOpenUserPanel && activeLobby && <MainField />}
				{isOpenUserPanel && <UserPanel />}
			</C.Chat>
		);
	}

	return (
		<C.Chat>
			<ChannelBar />
			<MainField />
			{isOpenUserPanel && <UserPanel />}
		</C.Chat>
	);
}

export default Chat;
