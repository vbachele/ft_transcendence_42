import React, {useContext, useEffect, useRef, useState} from 'react';
import SocketContext from 'contexts/Socket/context';
import {Pong} from './pong';
import Countdown from 'components/Popup/Countdown/Countdown';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {ClientGameEvents, ServerGameEvents} from 'events/game.events';
import Victory from 'components/Victory/Victory';
import Defeat from 'components/Defeat/Defeat';
import {useUserInfos} from 'contexts/User/userContent';
import Draw from '../../components/Draw/Draw';
import {useUpdateGameState} from './hooks/useUpdateGameState';
import {useSetupContext} from './hooks/useSetupContext';
import {openNotification} from '../../helpers/openNotification';

export interface Lobby {
	id: string;
	createdAt: string;
	createdBy: string;
	clients: string[];
}

function Game() {
	const {socket} = useContext(SocketContext).SocketState;
	const pongRef = useRef<Pong>();
	const [showVictory, setShowVictory] = useState(false);
	const [showDefeat, setShowDefeat] = useState(false);
	const [showDraw, setShowDraw] = useState(false);
	const container = document.getElementById('container');
	const canvas = document.getElementById('playground') as HTMLCanvasElement;
	const username = useUserInfos().userName.userName;
	const navigate = useNavigate();
	const {lobbyId} = useSetupContext(canvas);

	useUpdateGameState(pongRef);

	useEffect(() => {
		if (!lobbyId) return;
		pongRef.current = new Pong(socket!, lobbyId!, {isSpec: false});
		socket?.emit(ClientGameEvents.FetchSetup, {lobbyId: lobbyId});
		socket?.on(ServerGameEvents.Setup, (data) => {
			pongRef.current?.moveBall(data.ball.position, data.ball.velocity);
			pongRef.current?.movePaddle('left', data.leftPaddle.position);
			pongRef.current?.movePaddle('right', data.rightPaddle.position);
			data.timer ? pongRef.current?.updateTimer(data.timer) : 0;
			pongRef.current?.start();
		});
		return () => {
			socket?.off(ServerGameEvents.Setup);
			socket?.emit(ClientGameEvents.LeaveGame, {lobbyId: lobbyId});
		};
	}, [lobbyId]);

	useEffect(() => {
		socket?.on(ServerGameEvents.ClientLeft, () => {
			navigate('/');
			openNotification(
				'info',
				'Your opponent has left the battlefield. Coward!',
				'topRight'
			);
		});
		socket?.on(ServerGameEvents.GameResult, (data) => {
			pongRef.current?.stop();
			switch (data.winner) {
				case 'draw':
					setShowDraw(true);
					break;
				case username:
					setShowVictory(true);
					break;
				default:
					setShowDefeat(true);
			}
		});
		return () => {
			socket?.off(ServerGameEvents.GameResult);
			socket?.off(ServerGameEvents.ClientLeft);
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
			<Countdown />
			{showVictory && <Victory />}
			{showDefeat && <Defeat />}
			{showDraw && <Draw />}
		</div>
	);
}

export default Game;
