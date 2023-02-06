import {Socket} from 'socket.io-client';
import {ClientLobbyEvents, ServerLobbyEvents} from './events/lobby.events';
import {Lobby} from './Game';

export function createLobby(socket: Socket): Lobby {
	socket?.emit(ClientLobbyEvents.CreateLobby, {id: 0});
    let lobby: Lobby = {id: 'lasdjf', mode: 'duo', playerOne: 'rcollas'};
	socket?.on(ServerLobbyEvents.LobbyCreated, (payload) => {
		console.log(`Lobby create payload - [${payload.id}]`);
        lobby = payload;
	});
    return lobby;
}
