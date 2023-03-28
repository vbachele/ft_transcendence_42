import { Socket } from "socket.io";
import { ServerEvents } from "../events/lobby.events";
import { ALobby } from "../ALobby";
import {GameLobby} from '../../game/gameLobby';

type TCallback = (res: any) => void;

/**
 * This type extends the Socket class to facilitate the access and setup of useful data
 * such as the username and the lobbies attached to it
 */
export type AuthenticatedSocket = Socket & {
  data: {
    name: string;
    gameLobby?: GameLobby;
  };

  addLobby: (lobby: ALobby) => void;

  emit: <T>(event: ServerEvents, data: T, callback?: TCallback) => boolean;
};

export type ServerPayloads = {
  [ServerEvents.LobbyMessage]: {
    message: string;
    status?: string;
    lobbyId?: string;
  };
};
