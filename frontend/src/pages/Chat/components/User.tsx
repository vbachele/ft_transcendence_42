import React, {useContext} from "react";
import SocketContext from "../../../contexts/Socket/Context";
import {ClientEvents} from "../../../events/socket.events";
import * as S from "../components/components.styles";
import * as F from "../../../styles/font.styles";
import {displayStatus} from "../modals/ModalUserSearch";
import {IUser} from "../../../types/models";
import {StyledUser} from "./components.styles";

interface IProps {
	user: IUser;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function User({user, setIsModalOpen}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	function onClick(event: React.MouseEvent) {
		event.stopPropagation();
		const owner = localStorage.getItem('name');
		socket?.emit(ClientEvents.CreateLobby, {
			type: 'chat',
			data: {
				maxClients: 2,
				owner: owner,
				privacy: 'private',
				init: 'true',
				type: 'direct_message',
				name: user.name,
				description: `direct_message between ${owner} and ${user.name}`,
			},
		})
		setIsModalOpen(false);
	}

	return (
		<StyledUser onClick={onClick}>
			<div style={{width: '48px', height: '48px', position: 'relative'}}>
				<S.ProfilePic src={user.image} />
				{displayStatus(user.status)}
			</div>
			<F.Text style={{fontWeight: 600}}> {user.name} </F.Text>
		</StyledUser>
	);
}

export default User;