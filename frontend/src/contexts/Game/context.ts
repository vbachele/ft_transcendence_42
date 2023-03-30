import {IUser} from '../../types/models';
import React from 'react';

export interface IGameContextState {
	leftPlayer?: IUser;
	rightPlayer?: IUser;
	lobby: {id: string};
}

export const defaultGameContextState: IGameContextState = {
	leftPlayer: undefined,
	rightPlayer: undefined,
	lobby: {id: ''},
};

export type TGameContextActions =
	| 'update_left_player'
	| 'update_right_player'
	| 'update_lobby';

export type TGameContextPayload = IUser | string | undefined;

export interface IGameContextActions {
	type: TGameContextActions;
	payload: TGameContextPayload;
}

export const GameReducer = (
	state: IGameContextState,
	action: IGameContextActions
) => {

	switch (action.type) {
		case 'update_left_player':
			return {...state, leftPlayer: action.payload as IUser};
		case 'update_right_player':
			return {...state, rightPlayer: action.payload as IUser};
		case 'update_lobby':
			return {...state, lobby: {id: action.payload as string}};
		default:
			return {...state};
	}
};

export interface IGameContextProps {
	GameState: IGameContextState;
	GameDispatch: React.Dispatch<IGameContextActions>;
}

const GameContext = React.createContext<IGameContextProps>({
	GameState: defaultGameContextState,
	GameDispatch: () => {},
});

export const GameContextProvider = GameContext.Provider;

export const useGameContext = () => React.useContext(GameContext);

export default GameContext;
