import React, {createContext} from 'react';

export interface ILobbyContextState {
	status: string;
	lobbyId: string;
	type: string;
}

export const defaultLobbyContextState: ILobbyContextState = {
	status: '',
	lobbyId: '',
	type: '',
};

export type TLobbyContextActions = 'update_status' | 'update_lobbyId' | 'update_type';

export type TLobbyContextPayload = string;

export interface ILobbyContextActions {
	type: TLobbyContextActions;
	payload: TLobbyContextPayload;
}

export const LobbyReducer = (
	state: ILobbyContextState,
	action: ILobbyContextActions
) => {
	switch (action.type) {
		case 'update_status':
			return {...state, status: action.payload as string};
		case 'update_lobbyId':
			return {...state, lobbyId: action.payload as string};
		case 'update_type':
			return {...state, type: action.payload as string};
		default:
			return {...state};
	}
};

export interface ILobbyContextProps {
	LobbyState: ILobbyContextState;
	LobbyDispatch: React.Dispatch<ILobbyContextActions>;
}

const LobbyContext = createContext<ILobbyContextProps>({
	LobbyState: defaultLobbyContextState,
	LobbyDispatch: () => {},
});

export const LobbyContextConsumer = LobbyContext.Consumer;
export const LobbyContextProvider = LobbyContext.Provider;

export default LobbyContext;
