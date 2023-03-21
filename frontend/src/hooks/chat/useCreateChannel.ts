import {useContext, useEffect} from "react";
import SocketContext from "../../contexts/Socket/context";
import {ClientEvents} from "../../events/socket.events";

interface ICreateChannel {
	name: string;
	description: string;
	password: string;
}

function useCreateChannel(data: ICreateChannel) {
	const {socket} = useContext(SocketContext).SocketState;
	useEffect(() => {
		const owner = localStorage.getItem('name');
		socket?.emit(ClientEvents.CreateLobby, {
			type: "chat",
			data: {
				maxClients: '1024',
				owner: owner,
				privacy: data.password ? 'private' : 'public',
				init: true,
				...data,
			}
		})
		console.info(`Channel created`);
	}, [])
}

export default useCreateChannel;