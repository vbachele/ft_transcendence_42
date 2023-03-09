import * as S from './Chat.styles';
import LateralBar from './components/containers/LateralBar';
import MainField from './components/containers/MainFieldDirectMessages';
import RightBarDirectMessages from './components/messages/RightBarDirectMessages';
import React, {useLayoutEffect, useState} from 'react';
import MessagesContext from '../../contexts/Chat/MessagesContext';
import {useJoinLobby} from '../../hooks/chat/useJoinLobby';

function Chat() {
	const {joinLobby, lobbyId} = useJoinLobby();
	const [openUserPanel, setOpenUserPanel] = useState(false);
	const [openLateralBar, setOpenLateralBar] = useState(false);
	const {dataMessages} = React.useContext(MessagesContext);
	const [responsive, setResponsive] = useState(true);

	useLayoutEffect(() => {
		function updateSize() {
			if (window.innerWidth < 768) {
				setResponsive(true);
			} else {
				setResponsive(false);
			}
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	if (responsive) return (
		<S.default style={{display: 'flex', flexDirection: 'row', flexGrow: '1'}}>
			{!lobbyId && <LateralBar joinLobby={joinLobby}/>}
			{lobbyId && !openUserPanel && <MainField lobbyId={lobbyId} setOpenUserPanel={setOpenUserPanel} />}
			{openUserPanel && (
				<RightBarDirectMessages
					data={dataMessages}
					setOpenUserPanel={setOpenUserPanel}
				/>
			)}
		</S.default>
	)

	return (
		<S.default style={{display: 'flex', flexDirection: 'row', flexGrow: '1'}}>
			<LateralBar joinLobby={joinLobby} />
			<MainField lobbyId={lobbyId} setOpenUserPanel={setOpenUserPanel} />
			{openUserPanel && (
				<RightBarDirectMessages
					data={dataMessages}
					setOpenUserPanel={setOpenUserPanel}
				/>
			)}
		</S.default>
	);
}

export default Chat;