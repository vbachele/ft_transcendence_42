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
import {ClientEvents, ServerEvents} from './events/game.events';
import SocketContextComponent from 'contexts/Socket/Component';
import {StyledGame} from './Game.styles';

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
	const {socket, users, name} = useContext(SocketContext).SocketState;
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
	const [lobby, setLobby] = useState<Lobby>(emptyLobby());
	useEffect(() => {
		socket?.emit(ClientEvents.CreateLobby, {mode: 'duo'});
		socket?.on(ServerEvents.LobbyState, (payload) => {
			setLobby(payload);
		});
		console.log(lobby);
	}, []);

	function onJoinLobby() {
		socket?.emit(ClientEvents.JoinLobby, {lobbyId: 'f4292269-0998-45fd-bd92-a1952fc48bc3'})
		socket?.on(ServerEvents.LobbyState, (payload) => {
			setLobby(payload);
		});
	}

	return (
		<StyledGame>
			<p>User socket: {socket?.id}</p>
			<p>Users: {users.length}</p>
			<p>Lobby ID: {lobby?.id}</p>
			<p>Lobby creation date: {lobby?.createdAt}</p>
			<p>Lobby created by: {lobby?.createdBy}</p>
			<li style={{display: 'flex'}}>
				Players in lobby:
				<ul>
					{lobby?.clients.map((client) => {
						return <li style={{border: 'none', padding: '0px 8px'}}>{client}</li>;
					})}
				</ul>
			</li>
			<button onClick={onJoinLobby}>Join Lobby</button>
		</StyledGame>
	);
}

export default Game;
