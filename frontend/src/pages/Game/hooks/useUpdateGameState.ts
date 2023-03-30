import React, {useContext, useEffect} from 'react';
import {ServerGameEvents} from '../../../events/game.events';
import SocketContext from '../../../contexts/Socket/context';
import {Pong} from '../pong';
import {useNavigate} from 'react-router-dom';

export function useUpdateGameState(
	pongRef: React.MutableRefObject<Pong | undefined>,
	setScore: React.Dispatch<React.SetStateAction<{left: number; right: number}>>
) {
	const {socket} = useContext(SocketContext).SocketState;
	const navigate = useNavigate();

	useEffect(() => {
		socket?.on('exception', (data) => {
			if (data.status === 'game.forbidden' || 'bad_request')
				navigate('/notfound');
		});
		socket?.on(ServerGameEvents.Timer, (data) => {
			pongRef.current?.updateTimer(data.time);
		});
		socket?.on(ServerGameEvents.MoveBall, (data) => {
			pongRef.current?.moveBall(data.position, data.velocity);
		});
		socket?.on(ServerGameEvents.MovePaddle, (data) => {
			pongRef.current?.movePaddle(data.paddle, data.position);
		});
		socket?.on(ServerGameEvents.UpdateScore, (data) => {
			setScore(data.score);
			// pongRef.current?.updateScore(data.score);
		});
		socket?.on(ServerGameEvents.PaddleHit, (data) => {
			pongRef.current?.updatePaddleHit(data.side);
		});

		return () => {
			socket?.off(ServerGameEvents.MoveBall);
			socket?.off(ServerGameEvents.MovePaddle);
			socket?.off(ServerGameEvents.UpdateScore);
			socket?.off(ServerGameEvents.Timer);
			socket?.off('exception');
			pongRef.current?.stop();
			delete pongRef.current;
		};
	}, [socket]);
}
