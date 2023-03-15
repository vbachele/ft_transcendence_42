import ChatContext from 'contexts/Chat/chat.context';
import React, {useContext, useEffect} from "react";
import SocketContext from "../../contexts/Socket/Context";
import {ClientEvents} from "../../events/socket.events";

export function useJoinLobby() {
	const { socket } = useContext(SocketContext).SocketState;
	const {lobbyList} = useContext(ChatContext).ChatState;

	const joinLobby = (event: React.MouseEvent) => {
		event.preventDefault();
		const lobbyName = event.currentTarget.textContent!.replace("#", "");
		const lobbyId = lobbyList.find((lobby) => lobby.name === lobbyName)?.id;
		socket?.emit(ClientEvents.JoinLobby, {lobbyId: lobbyId});
	}

	return { joinLobby };
}
