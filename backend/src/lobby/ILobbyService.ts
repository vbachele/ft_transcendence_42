import { AuthenticatedSocket } from "./types/server.type";
import { Lobby as LobbyModel} from '@prisma/client'

export interface ILobbyService {
    initializeSocket(client: AuthenticatedSocket): void;
    terminateSocket(client: AuthenticatedSocket): void;
    create(mode: string, type: string): Promise<LobbyModel>;
    join(lobbyId: string, client: AuthenticatedSocket): void;
}