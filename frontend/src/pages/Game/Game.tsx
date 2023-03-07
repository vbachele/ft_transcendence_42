import React, {useContext, useEffect, useRef} from 'react';
import {StyledCanvas, StyledGame} from './Game.styles';
import SocketContext from '../../contexts/Socket/Context';
import {Pong} from './Pong';
import Countdown from '../../components/Popup/Countdown/Countdown';
import {useParams, useSearchParams} from 'react-router-dom';
import {ClientGameEvents, ServerGameEvents} from 'events/game.events';

const scaleWidth = 500;
const scaleHeight = 500;

export interface Lobby {
	id: string;
	createdAt: string;
	createdBy: string;
	clients: string[];
}

const emptyLobby = (): Lobby => ({
	id: 'none',
	createdAt: 'null',
	createdBy: 'null',
	clients: ['null'],
});

function Game() {
	const canvasRef = useRef(null);
	const {socket} = useContext(SocketContext).SocketState;
	const pongRef = useRef<Pong>();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const lobbyId = searchParams.get('lobbyId');
		// pongRef.current = new Pong(canvasRef.current!, socket!, 'right', 'alksjdf');
		// pongRef.current.run();
		// pongRef.current?.paddleController();

		socket?.emit(ClientGameEvents.FetchSetup, {lobbyId: lobbyId});
		socket?.on(ServerGameEvents.Setup, (data) => {
			pongRef.current = new Pong(canvasRef.current!, socket!, data, lobbyId!);
			// pongRef.current = new Pong(canvasRef.current!, socket!, data.paddle, lobbyId!);
			// pongRef.current.run();
			pongRef.current?.paddleController();
		});
		addEventListener('resize', resize);
		return () => {
			socket?.off(ServerGameEvents.Setup);
		};
	}, []);

	useEffect(() => {
		socket?.on(ServerGameEvents.MoveBall, (data) => {
			console.log(`update`);
			pongRef.current?.updateBody(data);
		});
		socket?.on(ServerGameEvents.MovePaddle, (data) => {
			console.log(`move paddle`);
			pongRef.current?.updateBody(data);
		});
		return () => {
			socket?.off(ServerGameEvents.Setup);
			socket?.off(ServerGameEvents.MoveBall);
		};
	}, [socket]);

	// useEffect(() => {
	// 	socket?.on(ServerGameEvents.MovePaddle, (pos) => {
	// 		console.log(`updating opponent paddle`);
	// 		pongRef.current?.updatePaddle(pos);
	// 	});
	// }, [socket]);

	function resize() {
		const canvas: HTMLCanvasElement = canvasRef.current!;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	return (
		<div>
			<StyledCanvas ref={canvasRef} tabIndex={1}></StyledCanvas>
			<Countdown />
		</div>
	);
}

export default Game;
