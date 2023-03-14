import React, {useContext, useEffect} from "react";
import SocketContext from "../../contexts/Socket/Context";
import {ClientEvents} from "../../events/socket.events";

export function useJoinLobby() {
	const { socket } = useContext(SocketContext).SocketState;

	const joinLobby = (event: React.MouseEvent) => {
		event.preventDefault();
		console.log(`Joining lobby: ${event.currentTarget.textContent}`);
		socket?.emit(ClientEvents.JoinLobby, {lobbyId: event.currentTarget.textContent});
	}

	return { joinLobby };
}
