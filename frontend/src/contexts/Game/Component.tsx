import {PropsWithChildren, useContext, useEffect, useReducer} from 'react';
import {defaultGameContextState, GameContextProvider, GameReducer} from './context';
import SocketContext from '../Socket/context';
import {ServerGameEvents} from '../../events/game.events';
import {IUser} from '../../types/models';

export interface IGameContextComponentProps extends PropsWithChildren {}

function GameContextComponent(props: IGameContextComponentProps) {
	const {children} = props;
	const [GameState, GameDispatch] = useReducer(
		GameReducer,
		defaultGameContextState
	);
	const {socket} = useContext(SocketContext).SocketState;

	useEffect(() => {
		socket?.on(ServerGameEvents.GameFound, (data: any) => {
			console.log(`game found = `, data);
			GameDispatch({type: 'update_left_player', payload: data.players.leftPlayer as IUser});
			GameDispatch({type: 'update_right_player', payload: data.players.rightPlayer as IUser});
			GameDispatch({type: 'update_lobby', payload: data.lobbyId});
		})

		return () => {
			socket?.off(ServerGameEvents.GameFound);
		}
	}, [socket]);

	return (
		<GameContextProvider value={{GameState, GameDispatch}}>
			{children}
		</GameContextProvider>
	);
}

export default GameContextComponent;
