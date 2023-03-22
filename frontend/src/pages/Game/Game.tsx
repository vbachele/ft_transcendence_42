import React, {useContext, useEffect, useRef} from 'react';
import {StyledCanvas, StyledGame} from './Game.styles';
import SocketContext from '../../contexts/Socket/context';
import {Pong} from './Pong';
import Countdown from '../../components/Popup/Countdown/Countdown';
import {useParams, useSearchParams} from 'react-router-dom';
import {ClientGameEvents, ServerGameEvents} from 'events/game.events';
import {Player} from '@lottiefiles/react-lottie-player';
import FireBall from 'pages/Game/assets/fireBall.json';
import PaddleHit from 'pages/Game/assets/paddleHit.json';
import Stick from 'pages/Game/assets/stick.png';
import styled from 'styled-components';

const LeftPaddle = styled.img`
	position: absolute;
	transform-origin: center;
	width: 27px;
	height: 140px;
	top: 300px;
	//left: 50%;
`;

const RightPaddle = styled.img`
	position: absolute;
	transform-origin: center;
	width: 27px;
	height: 140px;
	top: 300px;
	//left: 90%;
`

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
	const leftPaddle = useRef<HTMLElement>();
	const rightPaddle = useRef<HTMLElement>();

	useEffect(() => {
		const lobbyId = searchParams.get('lobbyId');
		const canvas = canvasRef.current! as HTMLCanvasElement;
		canvasPos.current = canvas.getBoundingClientRect();

		socket?.emit(ClientGameEvents.FetchSetup, {lobbyId: lobbyId});
		socket?.on(ServerGameEvents.Setup, (data) => {
			console.log(`game init`);
			pongRef.current = new Pong(canvasRef.current!, socket!, data, lobbyId!);
			pongRef.current?.paddleController();
		});
		fireBall.current = document.getElementById('fireBall')!;
		paddleHitElem.current = document.getElementById('paddleHit')!;
		leftPaddle.current = document.getElementById('leftPaddle')!;
		rightPaddle.current = document.getElementById('rightPaddle')!;
		return () => {
			socket?.off(ServerGameEvents.Setup);
			socket?.emit(ClientGameEvents.LeaveGame, {lobbyId: lobbyId});
		};
	}, []);

	function movePaddle(paddle: HTMLElement, position: {x: number; y: number}) {
		paddle.style.transform = `translate(${
			position.x - paddle.clientWidth! / 2
		}px, ${position.y - paddle.clientHeight! / 2}px)`;
	}

	useEffect(() => {
		socket?.on(ServerGameEvents.GamePaused, () => {
			console.log(`game paused!`);
		})

		socket?.on(ServerGameEvents.MoveBall, (data) => {
			const angle = Math.atan2(data.velocity.x, data.velocity.y);
			fireBall.current!.style.transform = `translate(${
				data.position.x - fireBall.current?.clientWidth! / 2
			}px, ${
				data.position.y - fireBall.current?.clientHeight!
			}px) rotate(${-angle}rad)`;
		});

		socket?.on(ServerGameEvents.MovePaddle, (data) => {
			switch (data.label) {
				case 'leftPaddle':
					movePaddle(leftPaddle.current!, data.position);
					break;
				case 'rightPaddle':
					movePaddle(rightPaddle.current!, data.position);
					break;
			}
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
				<LeftPaddle id={'leftPaddle'} src={Stick} alt={'left paddle'} />
				<RightPaddle id={'rightPaddle'} src={Stick} alt={'right paddle'} />
			</div>
			<Countdown />
		</div>
	);
}

export default Game;
