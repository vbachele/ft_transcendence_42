import { usePopup } from 'contexts/Popup/Popup';
import SocketContext from 'contexts/Socket/Context';
import { ClientEvents, ServerEvents } from 'pages/Game/events/game.events';
import { useContext, useEffect } from 'react';
import * as F from 'styles/font.styles';
import {ReactComponent as Icon} from './invite.svg';

interface IProps {
	id: number;
}

function Invite({id}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
    const {setHasInvited} = usePopup();

    function onInvite() {
            socket?.emit(ClientEvents.CreateLobby, {mode: 'duo'});
            socket?.once(ServerEvents.GameMessage, (data) => {
                if (data.message === 'Lobby created') {
                    console.info(`Sending invitation request`)
                    socket?.emit(ClientEvents.InviteToLobby, {invitedClient: socket.id})
                    setHasInvited(true);
                }
            })

        socket?.on(ServerEvents.InvitationDeclined, () => {
            setHasInvited(false);
        })
    }
	return (
		<button onClick={onInvite}>
			<Icon />
			<F.Text>Invite to play</F.Text>
		</button>
	);
}

export default Invite;
