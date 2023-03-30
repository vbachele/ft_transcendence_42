import React, {createContext} from 'react';
import {Socket} from 'socket.io-client';

export interface ISocketContextState {
	socket: Socket | undefined;
	name: string;
	users: string[];
}

export const defaultSocketContextState: ISocketContextState = {
	socket: undefined,
	name: '',
	users: [],
};

export type TSocketContextActions =
	| 'update_socket'
	| 'update_users'
	| 'remove_user'
	| 'update_name';

export type TSocketContextPayload = string | string[] | Socket;

export interface ISocketContextActions {
	type: TSocketContextActions;
	payload: TSocketContextPayload;
}

export const SocketReducer = (
	state: ISocketContextState,
	action: ISocketContextActions
) => {
	switch (action.type) {
		case 'update_socket':
			return {...state, socket: action.payload as Socket};
		case 'update_users':
			return {...state, users: action.payload as string[]};
		case 'remove_user':
			return {
				...state,
				users: state.users.filter((name) => name != (action.payload as string)),
			};
		case 'update_name':
			return {...state, name: action.payload as string};
		default:
			return {...state};
	}
};

export interface ISocketContextProps {
	SocketState: ISocketContextState;
	SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
	SocketState: defaultSocketContextState,
	SocketDispatch: () => {},
});

export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
