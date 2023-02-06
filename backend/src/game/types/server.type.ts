import { Socket } from "socket.io"
import { ServerEvents } from "../events/game.events";
import { Lobby } from "../lobby/lobby";

export type AuthenticatedSocket = Socket & {
    data: {
        lobby: null | Lobby;
    }

    emit: <T>(event: ServerEvents, data: T) => boolean;
}

export type ServerPayloads = {
    [ServerEvents.GameMessage]: {
        message: string;
    }
}