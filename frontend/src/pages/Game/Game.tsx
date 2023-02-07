import React, {
	ChangeEvent,
	ChangeEventHandler,
	KeyboardEventHandler,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import SocketContext from '../../contexts/Socket/Context';
import {useRef} from 'react';
import {Pong} from './Pong';
import {Socket} from 'socket.io-client';
import Matter from 'matter-js';
import {StyledChat, StyledGame} from './Game.styles';
import {stringify} from 'querystring';
import {BsTruckFlatbed} from 'react-icons/bs';
import {Auth} from './Temp/Auth/Auth';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { ClientLobbyEvents, ServerLobbyEvents } from './events/lobby.events';
import { createLobby } from './lobby';

export interface Lobby {
	id: string;
	mode: 'solo' | 'duo';
	playerOne: string;
	playerTwo?: string;
}

function Game() {
	const {socket, users, uid} = useContext(SocketContext).SocketState;
	const [lobby, setLobby] = useState<Lobby>();
	// const [position, setPosition] = useState({x: 0, y: 0});
	// const canvasRef = useRef(null);
	// let pong: Pong;

	// useEffect(() => {
	// 	pong = new Pong(canvasRef.current!, socket as Socket);
	// 	console.log(position);
	// 	pong.run();
	// 	pong.paddleController();
	// 	setPosition(pong.leftPaddlePosition());
	// 	redraw();
	// }, []);

	// function redraw() {
	// 	const canvas: HTMLCanvasElement = canvasRef.current!;
	// 	canvas.width = canvas.clientWidth;
	// 	canvas.height = canvas.clientHeight;
	// const navigate = useNavigate();
	// }
	useEffect(() => {
		try {
			const lobby = createLobby(socket!);
			setLobby(lobby as Lobby);
		} catch(error) {
			console.error(error);
		}
	}, []);

	return (
		<div
			className="box-container"
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '0px',
				padding: '0px',
			}}
		>
			<div style={{padding: '32px'}}>
				<p>User uid: {uid}</p>
				<p>Users: {users.length}</p>
				<p>Lobby ID: {lobby?.id}</p>
				<p>Lobby mode: {lobby?.mode}</p>
				<p>Lobby player one: {lobby?.playerOne}</p>
			</div>
		</div>
	);
}

export default Game;
