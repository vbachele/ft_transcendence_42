import React, {useContext, useEffect, useRef} from 'react';
import {StyledCanvas, StyledGame} from './Game.styles';
import SocketContext from '../../contexts/Socket/Context';
import {Pong} from './Pong';
import Countdown from '../../components/Popup/Countdown/Countdown';
import {useParams, useSearchParams} from 'react-router-dom';
import {ClientGameEvents, ServerGameEvents} from 'events/game.events';
import {Player} from '@lottiefiles/react-lottie-player';
import FireBall from 'assets/fireBall.json';
import PaddleHit from 'assets/paddleHit.json';

export interface Lobby {
	id: string;
	createdAt: string;
	createdBy: string;
	clients: string[];
}

function Game() {
	const canvasRef = useRef(null);
	const {socket} = useContext(SocketContext).SocketState;
	const pongRef = useRef<Pong>();
	const [searchParams] = useSearchParams();
	const fireBall = useRef<HTMLElement>();
	const canvasPos = useRef<DOMRect>();
	const paddleHitRef = React.createRef<Player>();
	const paddleHitElem = useRef<HTMLElement>();

	useEffect(() => {
		const lobbyId = searchParams.get('lobbyId');
		const canvas = canvasRef.current! as HTMLCanvasElement;
		canvasPos.current = canvas.getBoundingClientRect();

		socket?.emit(ClientGameEvents.FetchSetup, {lobbyId: lobbyId});
		socket?.on(ServerGameEvents.Setup, (data) => {
			pongRef.current = new Pong(canvasRef.current!, socket!, data, lobbyId!);
			pongRef.current?.paddleController();
		});
		fireBall.current = document.getElementById('fireBall')!;
		paddleHitElem.current = document.getElementById('paddleHit')!;
		addEventListener('resize', resize);
		return () => {
			socket?.off(ServerGameEvents.Setup);
		};
	}, []);

	useEffect(() => {
		socket?.on(ServerGameEvents.MoveBall, (data) => {
			const angle = Math.atan2(data.velocity.x, data.velocity.y);
			fireBall.current!.style.transform = `translate(${
				data.position.x - fireBall.current?.clientWidth! / 2
			}px, ${
				data.position.y - fireBall.current?.clientHeight!
			}px) rotate(${-angle}rad)`;
		});
		socket?.on(ServerGameEvents.MovePaddle, (data) => {
			pongRef.current?.updateBody(data);
		});
		socket?.on(ServerGameEvents.PaddleHit, (data) => {
			paddleHitElem.current!.style.visibility = 'visible';
			paddleHitElem.current!.style.transform = `translate(${
				data.position.x - paddleHitElem.current?.clientWidth! / 2
			}px, ${data.position.y - paddleHitElem.current?.clientHeight! / 2}px)`;

			paddleHitRef.current?.play();
			setTimeout(() => {
				paddleHitElem.current!.style.visibility = 'hidden';
			}, 1_000);
		});
		return () => {
			socket?.off(ServerGameEvents.MoveBall);
			socket?.off(ServerGameEvents.MovePaddle);
			socket?.off(ServerGameEvents.PaddleHit);
		};
	}, [socket]);

	function resize() {
		const canvas: HTMLCanvasElement = canvasRef.current!;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	return (
		<div>
			<div style={{position: 'relative'}}>
				<StyledCanvas
					id="canvas"
					ref={canvasRef}
					tabIndex={1}
					style={{position: 'absolute'}}
				></StyledCanvas>
				<Player
					id={'fireBall'}
					autoplay={true}
					loop={true}
					src={FireBall}
					style={{
						position: 'absolute',
						transformOrigin: 'bottom center',
					}}
				/>
				<Player
					id={'paddleHit'}
					src={PaddleHit}
					autoplay={false}
					loop={false}
					ref={paddleHitRef}
					style={{
						position: 'absolute',
						transformOrigin: 'center',
						width: '200px',
						height: '200px',
						visibility: 'hidden',
					}}
				/>
			</div>
			<Countdown />
		</div>
	);
}

export default Game;
