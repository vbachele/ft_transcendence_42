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
`;

const RightPaddle = styled.img`
	position: absolute;
	transform-origin: center;
	width: 27px;
	height: 140px;
`;

const StyledFireBall = styled.div`
	width: 40px;
	height: 40px;
	//background: linear-gradient(90deg, red 50%, green 50%);
	display: inline-flex;
	position: absolute;
	align-items: flex-end;
	justify-content: center;
	line-height: 0;
	transform-origin: center;
	.lf-player-container {
		flex: 1 0 auto;
		padding-right: 7px;
		width: 200px;
		line-height: 0;
	}
`;

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
	// const canvasPos = useRef<DOMRect>();
	const paddleHitRef = React.createRef<Player>();
	const paddleHitElem = useRef<HTMLElement>();
	const leftPaddle = useRef<HTMLElement>();
	const rightPaddle = useRef<HTMLElement>();

	useEffect(() => {
		const lobbyId = searchParams.get('lobbyId');

		fireBall.current = document.getElementById('fireBall')!;
		paddleHitElem.current = document.getElementById('paddleHit')!;
		leftPaddle.current = document.getElementById('leftPaddle')!;
		rightPaddle.current = document.getElementById('rightPaddle')!;
		pongRef.current = new Pong(socket!, lobbyId!);

		socket?.emit(ClientGameEvents.FetchSetup, {lobbyId: lobbyId});
		socket?.on(ServerGameEvents.Setup, (data) => {
			pongRef.current?.moveBall(
				fireBall.current!,
				data.ball.position,
				data.ball.velocity
			);
			pongRef.current?.movePaddle(
				leftPaddle.current!,
				data.leftPaddle.position
			);
			pongRef.current?.movePaddle(
				rightPaddle.current!,
				data.rightPaddle.position
			);
			pongRef.current?.start();
		});
		return () => {
			socket?.off(ServerGameEvents.Setup);
			socket?.emit(ClientGameEvents.LeaveGame, {lobbyId: lobbyId});
		};
	}, []);

	useEffect(() => {
		socket?.on(ServerGameEvents.GamePaused, () => {
			console.log(`game paused!`);
		});

		socket?.on(ServerGameEvents.MoveBall, (data) => {
			if (data.message) {
				console.log(`message: `, data.message);
			}
			pongRef.current?.moveBall(
				fireBall.current!,
				data.position,
				data.velocity
			);
		});

		socket?.on(ServerGameEvents.MovePaddle, (data) => {
			switch (data.paddle) {
				case 'left':
					pongRef.current?.movePaddle(leftPaddle.current!, data.position);
					break;
				case 'right':
					pongRef.current?.movePaddle(rightPaddle.current!, data.position);
					break;
			}
		});

		// socket?.on(ServerGameEvents.PaddleHit, (data) => {
		// 	paddleHitElem.current!.style.visibility = 'visible';
		// 	paddleHitElem.current!.style.transform = `translate(${
		// 		data.position.x - paddleHitElem.current?.clientWidth! / 2
		// 	}px, ${data.position.y - paddleHitElem.current?.clientHeight! / 2}px)`;
		//
		// 	paddleHitRef.current?.play();
		// 	setTimeout(() => {
		// 		paddleHitElem.current!.style.visibility = 'hidden';
		// 	}, 1_000);
		// });
		return () => {
			socket?.off(ServerGameEvents.MoveBall);
			socket?.off(ServerGameEvents.MovePaddle);
			socket?.off(ServerGameEvents.PaddleHit);
		};
	}, [socket]);

	return (
		<div>
			<div style={{border: '1px solid black', width: '800px', height: '600px'}}>
				<StyledFireBall id={'fireBall'}>
					<Player autoplay={true} loop={true} src={FireBall} />
				</StyledFireBall>
				{/*<Player*/}
				{/*	id={'paddleHit'}*/}
				{/*	src={PaddleHit}*/}
				{/*	autoplay={false}*/}
				{/*	loop={false}*/}
				{/*	ref={paddleHitRef}*/}
				{/*	style={{*/}
				{/*		position: 'absolute',*/}
				{/*		transformOrigin: 'center',*/}
				{/*		width: '200px',*/}
				{/*		height: '200px',*/}
				{/*		visibility: 'hidden',*/}
				{/*	}}*/}
				{/*/>*/}
				<LeftPaddle id={'leftPaddle'} src={Stick} alt={'left paddle'} />
				<RightPaddle id={'rightPaddle'} src={Stick} alt={'right paddle'} />
			</div>
			<Countdown />
		</div>
	);
}

export default Game;
