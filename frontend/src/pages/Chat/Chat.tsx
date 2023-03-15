import * as C from './containers/containers.styles';
import ChannelBar from './containers/ChannelBar';
import MainField from './containers/MainField';
import UserPanel from './containers/UserPanel';
import React, {useContext, useState} from 'react';
import ChatContext from 'contexts/Chat/chat.context';
import {useResponsiveLayout} from 'hooks/chat/useResponsiveLayout';

function Chat() {
	const {activeLobby} = useContext(ChatContext).ChatState;
	const [activeUserPanel, setActiveUserPanel] = useState(false);
	const {responsive} = useResponsiveLayout();

	if (responsive) {
		return (
			<C.Chat>
				{!activeLobby && <ChannelBar />}
				{!activeUserPanel && activeLobby && (
					<MainField setOpenUserPanel={setActiveUserPanel} />
				)}
				{activeUserPanel && <UserPanel setOpenUserPanel={setActiveUserPanel} />}
			</C.Chat>
		);
	}

	return (
		<C.Chat>
			<ChannelBar />
			<MainField setOpenUserPanel={setActiveUserPanel} />
			{activeUserPanel && <UserPanel setOpenUserPanel={setActiveUserPanel} />}
		</C.Chat>
	);
}

export default Chat;
