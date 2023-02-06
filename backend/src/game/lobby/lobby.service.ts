import { Injectable } from '@nestjs/common'
import { LobbyCreateDto } from './dtos/lobby.dto';
import { Server } from 'socket.io'
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import { AuthenticatedSocket } from '../types/server.type';
import { Lobby } from './lobby';

@Injectable()
export class LobbyService {
    public server: Server;
    private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<Lobby['id'], Lobby>();

    public initializeSocket(client: AuthenticatedSocket): void {
        client.data.lobby = null;
    }

    public terminateSocket(client: AuthenticatedSocket): void {

    }

    public create(mode: string): Lobby {
        const lobby = new Lobby(this.server, 2)
        return lobby;
    }

    public join(lobbyId: string, client: AuthenticatedSocket): void {
    } 
}