import React, {createContext} from 'react';
import {IUser} from '../../types/models';

export interface ILobby {
	name: string;
	description: string;
	admins: string[];
	createdAt: string;
	id: string;
	maxClients: number;
	privacy: string;
	type: string;
	messages: any[];
	users: any[];
}

export interface IChatContextState {
	lobbyList: Set<ILobby>;
	activeLobby: ILobby | undefined;
	isOpenUserPanel: boolean;
	userInPanel: IUser | undefined;
}

export const defaultChatContextState: IChatContextState = {
	lobbyList: new Set<ILobby>(),
	activeLobby: undefined,
	isOpenUserPanel: false,
	userInPanel: undefined,
};

export type TChatContextActions =
	| 'update_lobby_list'
	| 'update_active_lobby'
	| 'add_lobby'
	| 'update_user_panel'
	| 'active_user_in_panel';

export type TChatContextPayload =
	| ILobby
	| Set<ILobby>
	| boolean
	| IUser
	| undefined;

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
			return {...state, lobbyList: action.payload as Set<ILobby>};
		case 'update_active_lobby':
			return {...state, activeLobby: action.payload as ILobby};
		case 'update_user_panel':
			return {...state, isOpenUserPanel: action.payload as boolean};
		case 'active_user_in_panel':
			return {...state, userInPanel: action.payload as IUser};
		case 'add_lobby':
			return {
				...state,
				lobbyList: new Set([...state.lobbyList, action.payload as ILobby]),
			};
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

export const ChatContextProvider = ChatContext.Provider;

export default ChatContext;
