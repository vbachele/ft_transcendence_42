import React, {createContext} from 'react';

export interface ILobby {
	name: string;
	description: string;
	adminId: number;
	createdAt: string;
	id: string;
	maxClients: number;
	privacy: string;
	type: string;
	messages: any[];
}

export interface IChatContextState {
	lobbyList: ILobby[];
	activeLobby: ILobby | undefined;
}

export const defaultChatContextState: IChatContextState = {
	lobbyList: [],
	activeLobby: undefined,
};

export type TChatContextActions = 'update_lobby_list' | 'update_active_lobby';

export type TChatContextPayload = ILobby | ILobby[] | undefined;

export interface IChatContextActions {
	type: TChatContextActions;
	payload: TChatContextPayload;
}

export const ChatReducer = (
	state: IChatContextState,
	action: IChatContextActions
) => {
	console.log(
		`Chat context updated - Action: ${action.type} - Payload: `,
		action.payload
	);

	switch (action.type) {
		case 'update_lobby_list':
			return {...state, lobbyList: action.payload as ILobby[]};
		case 'update_active_lobby':
			return {...state, activeLobby: action.payload as ILobby};
		default:
			return {...state};
	}
};

export interface IChatContextProps {
	ChatState: IChatContextState;
	ChatDispatch: React.Dispatch<IChatContextActions>;
}

const ChatContext = createContext<IChatContextProps>({
	ChatState: defaultChatContextState,
	ChatDispatch: () => {},
});

export const ChatContextConsumer = ChatContext.Consumer;
export const ChatContextProvider = ChatContext.Provider;

export default ChatContext;
