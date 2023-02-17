import {createContext} from 'react';

export interface ILobbyContextState {
	status: string;
	lobbyId: string;
}

export const defaultLobbyContextState: ILobbyContextState = {
	status: '',
	lobbyId: '',
};

export type TLobbyContextActions = 'update_status' | 'update_lobbyId';

export type TLobbyContextPayload = string | string;

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
