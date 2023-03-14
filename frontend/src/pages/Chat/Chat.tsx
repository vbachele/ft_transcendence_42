import * as S from './Chat.styles';
import LateralBar from './containers/LateralBar';
import MainField from './containers/MainField';
import UserPanel from './containers/UserPanel';
import React, {useContext, useState} from 'react';
import {useJoinLobby} from '../../hooks/chat/useJoinLobby';
import ChatContext from '../../contexts/Chat/chat.context';
import {useResponsiveLayout} from '../../hooks/chat/useResponsiveLayout';

function Chat() {
	const {joinLobby} = useJoinLobby();
	const {activeLobby} = useContext(ChatContext).ChatState;
	const [activeUserPanel, setActiveUserPanel] = useState(false);
	const {responsive} = useResponsiveLayout();

	if (responsive) {
		return (
			<S.Chat>
				{!activeLobby && <LateralBar joinLobby={joinLobby} />}
				{!activeUserPanel && activeLobby && (
					<MainField setOpenUserPanel={setActiveUserPanel} />
				)}
				{activeUserPanel && <UserPanel setOpenUserPanel={setActiveUserPanel} />}
			</S.Chat>
		);
	}

	return (
		<S.Chat>
			<LateralBar joinLobby={joinLobby} />
			<MainField setOpenUserPanel={setActiveUserPanel} />
			{activeUserPanel && <UserPanel setOpenUserPanel={setActiveUserPanel} />}
		</S.Chat>
	);
}

export default Chat;
