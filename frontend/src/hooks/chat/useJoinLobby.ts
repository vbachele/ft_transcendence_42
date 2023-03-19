import ChatContext from 'contexts/Chat/chat.context';
import React, {useContext, useEffect} from "react";
import SocketContext from "../../contexts/Socket/Context";
import {ClientEvents} from "../../events/socket.events";
import {useUserInfos} from '../../contexts/User/userContent';

export function useJoinLobby() {
	const { socket } = useContext(SocketContext).SocketState;
	const {lobbyList} = useContext(ChatContext).ChatState;
	const name = useUserInfos().userName.userName;

	const joinLobby = (event: React.MouseEvent) => {
		event.preventDefault();
		let lobbyName = [event.currentTarget.textContent!];
		if (lobbyName[0].includes("#")) {
			lobbyName[0] = lobbyName[0].replace("#", "");
		} else {
			lobbyName[0] = event.currentTarget.textContent! + '+' + name;
			lobbyName.push(name + '+' +event.currentTarget.textContent!);
		}
		console.log(lobbyName);
		const lobbyId = [...lobbyList].find((lobby) => lobbyName.includes(lobby.name))?.id;
		socket?.emit(ClientEvents.JoinLobby, {lobbyId: lobbyId});
	}

	return { joinLobby };
}