import React, {useContext, useState} from "react";
import SocketContext from "../../contexts/Socket/Context";
import {ClientChatEvents} from "../../events/chat.events";

export function useSendMessage(lobbyId: string) {
	const {socket} = useContext(SocketContext).SocketState;
	const [message, setMessage] = useState('');

	const sendMessage = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(message);
		socket?.emit(ClientChatEvents.SendMessage, {
			message: message,
			lobbyId: lobbyId,
		});
		setMessage('');
		(event.target as HTMLFormElement).reset();
	};

	return {message, setMessage, sendMessage};
}