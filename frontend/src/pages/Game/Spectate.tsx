import React, {useContext, useEffect, useRef, useState} from 'react';
import SocketContext from 'contexts/Socket/context';
import {Pong} from './pong';
import {useNavigate} from 'react-router-dom';
import {ClientGameEvents, ServerGameEvents} from 'events/game.events';
import {useUpdateGameState} from './hooks/useUpdateGameState';
import {useSetupContext} from './hooks/useSetupContext';
import {openNotification} from '../../helpers/openNotification';
import {useGameContext} from '../../contexts/Game/context';
import Score from './components/Score';
import {StyledGame} from './Game.styles';

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
	useSetupContext(canvas);
	const navigate = useNavigate();
	const [score, setScore] = useState({left: 0, right: 0});

	const {lobby, leftPlayer, rightPlayer} = useGameContext().GameState;

	useUpdateGameState(pongRef, setScore);

	useEffect(() => {
		if (!lobby.id) return;
		pongRef.current = new Pong(socket!, lobby.id, {isSpec: true});
		socket?.emit(ClientGameEvents.Spectate, {lobbyId: lobby.id});
		pongRef.current?.start();
	}, [lobby.id]);

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

	if (!lobby.id || !leftPlayer || !rightPlayer) return null;

	return (
		<div>
			<Score score={score} leftPlayer={leftPlayer} rightPlayer={rightPlayer} />
			<StyledGame id="container">
				<canvas
					id="playground"
					width={container ? container.clientWidth : 1280}
					height={container ? container.clientHeight : 720}
					style={{width: '100%', height: '100%'}}
				/>
			</StyledGame>
		</div>
	);
}

export default Spectate;
