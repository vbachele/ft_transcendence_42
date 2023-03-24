import React, {useContext, useState} from 'react';
import {Button, Modal} from 'antd';
import * as F from 'styles/font.styles';
import {ClientEvents} from '../../../events/socket.events';
import SocketContext from '../../../contexts/Socket/context';
import ChatContext from '../../../contexts/Chat/context';

const ModalChanPass: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const {socket} = useContext(SocketContext).SocketState;
	const ChatDispatch = useContext(ChatContext).ChatDispatch;

	const handleOk = async () => {
	// 	try {
	// 		const res = await socket?.emitWithAck(ClientEvents.JoinLobby, {
	// 			lobbyId: lobby.id,
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	socket?.on(error, (data) => {
	// 		if (data.error === 'password') {
	// 			console.log('wrong password');
	// 		} else {
	// 			ChatDispatch({type: 'update_user_panel', payload: false});
	// 		}
	// 		setIsModalOpen(false);
	// 	});
	// 	if (password === 'ok') {
	// 		socket?.emit(ClientEvents.JoinLobby, {lobbyId: lobby.id});
	// 	}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal
				title={
					<div style={{display: 'flex'}}>
						<h1 color={'black'}>#Boomers</h1>
					</div>
				}
				centered
				width={'393px'}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" style={{border: 'none'}} onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="back" onClick={handleOk}>
						Validate
					</Button>,
				]}
			>
				<p style={{marginBottom: '24px', marginTop: '16px'}}>
					{' '}
					This channel is protected by a password.
				</p>
				<F.H5 style={{fontWeight: 500, marginBottom: '8px'}}> Password </F.H5>
				{/*<InputBox placeHolder=''/>                 */}
			</Modal>
		</>
	);
};

export default ModalChanPass;
