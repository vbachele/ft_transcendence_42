import React, {useContext, useEffect, useRef} from 'react';
import SocketContext from 'contexts/Socket/context';
import {Pong} from './pong';
import {useNavigate} from 'react-router-dom';
import {ClientGameEvents, ServerGameEvents} from 'events/game.events';
import {useUpdateGameState} from './hooks/useUpdateGameState';
import {useSetupContext} from './hooks/useSetupContext';
import {openNotification} from '../../helpers/openNotification';

export interface Lobby {
	id: string;
	createdAt: string;
	createdBy: string;
	clients: string[];
}

function Spectate() {
	const {socket} = useContext(SocketContext).SocketState;
	const pongRef = useRef<Pong>();
	const container = document.getElementById('container');
	const canvas = document.getElementById('playground') as HTMLCanvasElement;
	const {lobbyId} = useSetupContext(canvas);
	const navigate = useNavigate();

	useUpdateGameState(pongRef);

	useEffect(() => {
		if (!lobbyId) return;
		pongRef.current = new Pong(socket!, lobbyId!, {isSpec: true});
		socket?.emit(ClientGameEvents.Spectate, {lobbyId: lobbyId});
		pongRef.current?.start();
	}, [lobbyId]);

	useEffect(() => {
		socket?.on(ServerGameEvents.ClientLeft, () => {
			navigate('/');
			openNotification(
				'info',
				'Live disruption. One of the players went out to buy milk...',
				'topRight'
			);
		});
		socket?.on(ServerGameEvents.GameResult, (data) => {
			pongRef.current?.stop();
			switch (data.winner) {
			}
		});
		return () => {
			socket?.off(ServerGameEvents.ClientLeft);
			socket?.off(ServerGameEvents.GameResult);
		};
	}, [socket]);

	return (
		<div>
			<div
				id="container"
				style={{
					aspectRatio: '16 / 9',
					maxHeight: '80vh',
					boxShadow: '0 0 10px 10px rgba(100, 100, 100, 0.8)',
					margin: '32px auto',
				}}
			>
				<canvas
					id="playground"
					width={container ? container.clientWidth : 1280}
					height={container ? container.clientHeight : 720}
					style={{width: '100%', height: '100%'}}
				/>
			</div>
		</div>
	);
}

export default Spectate;
