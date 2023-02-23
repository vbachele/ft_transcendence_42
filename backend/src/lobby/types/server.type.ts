import { Socket } from "socket.io"
import { ServerEvents } from "../events/lobby.events";
import { Lobby } from "../lobby";
import { Lobby as LobbyModel} from '@prisma/client'

type TCallback = (res: any) => void;

export type AuthenticatedSocket = Socket & {
    data: {
        gameLobby: Lobby | undefined;
        chatLobbies: Map<string, Lobby>;
        name: string;
    }

    addLobby: (lobby: Lobby) => void;

    emit: <T>(event: ServerEvents, data: T, callback?: TCallback) => boolean;
}

export type ServerPayloads = {
    [ServerEvents.LobbyMessage]: {
        message: string;
        status?: string;
    }
}