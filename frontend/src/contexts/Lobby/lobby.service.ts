import SocketContext from 'contexts/Socket/Context';
import {ClientEvents} from 'pages/Game/events/game.events';
import {useContext} from 'react';
import {GameEvents} from './events';
import LobbyContext from './lobby.context';

export class LobbyService {
	private readonly lobbyDispatch = useContext(LobbyContext).LobbyDispatch;
	private readonly lobbyState = useContext(LobbyContext).LobbyState;
	private readonly socket = useContext(SocketContext).SocketState.socket;

	public handleInvite(invitation: any) {
		console.log(invitation.lobby);
		this.lobbyDispatch({type: 'update_type', payload: invitation.lobby.type});
		this.lobbyDispatch({type: 'update_lobbyId', payload: invitation.lobby.id});
		this.lobbyDispatch({type: 'update_status', payload: GameEvents.Invited})
	}

	public handleResponse() {
		switch (this.lobbyState.type) {
			case 'game':
				this.gameResponse();
				break;
			case 'chat':
				this.chatResponse();
				break;
			// default:
			// 	throw new Error(`Invalid lobby type - [${this.lobbyState.type}]`);
		}
	}

	private dispatchResponse() {
		this.socket?.emit(ClientEvents.InvitationResponse, {
			status: this.lobbyState.status,
			lobbyId: this.lobbyState.lobbyId,
		});
	}

	private gameResponse() {
		if (this.lobbyState.status === GameEvents.Accepted) {
			this.dispatchResponse();
			const close = setTimeout(() => {
				this.lobbyDispatch({type: 'update_status', payload: ''});
				clearTimeout(close);
			}, 4_000);
		}
		if (this.lobbyState.status === GameEvents.Declined) {
			this.dispatchResponse();
			this.lobbyDispatch({type: 'update_status', payload: ''});
		}
	}

	private chatResponse() {}
}
