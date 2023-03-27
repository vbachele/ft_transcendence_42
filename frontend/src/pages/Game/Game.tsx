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

export interface Lobby {
	id: string;
	createdAt: string;
	createdBy: string;
	clients: string[];
}

function Game() {
	const {socket} = useContext(SocketContext).SocketState;
	const pongRef = useRef<Pong>();
	const [searchParams] = useSearchParams();
	const [lobbyId, setLobbyId] = useState('');
	const [showVictory, setShowVictory] = useState(false);
	const [showDefeat, setShowDefeat] = useState(false);
	const [showDraw, setShowDraw] = useState(false);
	const container = document.getElementById('container');
	const canvas = document.getElementById('playground') as HTMLCanvasElement;
	const username = useUserInfos().userName.userName;
	const navigate = useNavigate();

	useEffect(() => {
		const lobbyId = searchParams.get('lobbyId');
		console.log(`lobbyId: ${lobbyId}`);
		setLobbyId(searchParams.get('lobbyId')!);
		if (canvas) {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}
	}, []);

	useEffect(() => {
		if (!lobbyId) return;
		pongRef.current = new Pong(socket!, lobbyId!);
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
		socket?.on(ServerGameEvents.Timer, (data) => {
			console.log(`data = `, data);
			pongRef.current?.updateTimer(data.time);
		});
		socket?.on('exception', (data) => {
			if (data.status === 'game.forbidden' || 'bad_request')
				navigate('/notfound');
		});
		socket?.on(ServerGameEvents.MoveBall, (data) => {
			pongRef.current?.moveBall(data.position, data.velocity);
		});
		socket?.on(ServerGameEvents.MovePaddle, (data) => {
			pongRef.current?.movePaddle(data.paddle, data.position);
		});
		socket?.on(ServerGameEvents.UpdateScore, (data) => {
			pongRef.current?.updateScore(data.score);
		});
		socket?.on(ServerGameEvents.GameResult, (data) => {
			pongRef.current?.stop();
			console.log(`game result = `, data);
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
			socket?.off(ServerGameEvents.MoveBall);
			socket?.off(ServerGameEvents.MovePaddle);
			socket?.off(ServerGameEvents.UpdateScore);
			socket?.off(ServerGameEvents.Timer);
			socket?.off(ServerGameEvents.GameResult);
			pongRef.current?.stop();
			delete pongRef.current;
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
