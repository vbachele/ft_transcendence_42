import {useFetchLobbies} from 'hooks/chat/useFetchLobbies';
import {useState} from 'react';
import {useSendMessage} from '../../hooks/chat/useSendMessage';
import {useReceiveMessage} from '../../hooks/chat/useReceiveMessage';
import {useJoinLobby} from '../../hooks/chat/useJoinLobby';
import useForceUpdate from "antd/es/_util/hooks/useForceUpdate";

interface InputProps {
	lobbyId: string;
}

function InputZone({lobbyId}: InputProps) {
	const {setMessage, sendMessage} = useSendMessage(lobbyId);
	const messages = useReceiveMessage(lobbyId);

	return (
		<div style={{minHeight: '600px', maxHeight: '600px', overflow: 'auto'}}>
			<h1>{lobbyId}</h1>
			<form onSubmit={sendMessage}>
				<input
					type="text"
					onChange={(event) => setMessage(event.currentTarget.value)}
				/>
			</form>
			{messages.map((message) => (
				<p>{message}</p>
			))}
		</div>
	);
}

export function ChatTest() {
	const lobbies = useFetchLobbies();
	const {joinLobby, lobbyId} = useJoinLobby();

	return (
		<div>
			<h1>ChatTest</h1>
			<div style={{display: 'flex', flexDirection: 'column', width: '400px'}}>
				{lobbies.map((lobby) => (
					<button onClick={joinLobby}>{lobby.id}</button>
				))}
			</div>
			{lobbyId && <InputZone lobbyId={lobbyId} />}
		</div>
	);
}
