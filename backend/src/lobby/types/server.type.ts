import { Socket } from "socket.io"
import { ServerEvents } from "../events/lobby.events";
import { Lobby as LobbyModel} from '@prisma/client'
import {ALobby} from "../ALobby";

type TCallback = (res: any) => void;

export type AuthenticatedSocket = Socket & {
    data: {
        gameLobby: ALobby | undefined;
        chatLobbies: Map<string, ALobby>;
        name: string;
    }

    addLobby: (lobby: ALobby) => void;

    emit: <T>(event: ServerEvents, data: T, callback?: TCallback) => boolean;
}

export type ServerPayloads = {
    [ServerEvents.LobbyMessage]: {
        message: string;
        status?: string;
        lobbyId?: string;
    }
}