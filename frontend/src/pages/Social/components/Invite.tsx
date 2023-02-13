import { usePopup } from "contexts/Popup/popup";
import SocketContext from "contexts/Socket/Context";
import { ClientEvents, ServerEvents } from "pages/Game/events/game.events";
import { on } from "process";
import { useContext } from "react";

interface IProps {
    friendId: number;
}



function Invite(props: IProps) {
    const {socket} = useContext(SocketContext).SocketState;
    const {setHasInvited} = usePopup();

    function onInvite() {
        socket?.emit(ClientEvents.CreateLobby, {mode: 'duo'});
        socket?.on(ServerEvents.GameMessage, (data) => {
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
            Invite to play
        </button>
    )
}

export default Invite;