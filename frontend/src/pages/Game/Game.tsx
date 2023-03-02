import React, {useContext, useEffect, useRef} from 'react';
import {StyledCanvas, StyledGame} from './Game.styles';
import SocketContext from '../../contexts/Socket/Context';
import {Pong} from './Pong';
import Countdown from '../../components/Popup/Countdown/Countdown';

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

	useEffect(() => {
		pongRef.current = new Pong(canvasRef.current!, socket!, 'right');
		pongRef.current.run();
		pongRef.current?.paddleController();
		addEventListener('resize', resize);
	}, []);

	function resize() {
		const canvas: HTMLCanvasElement = canvasRef.current!;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	return (
		<div>
			<StyledCanvas ref={canvasRef} tabIndex={1}>
			</StyledCanvas>
			<Countdown />
		</div>

	);
}

export default Game;
