import { Injectable } from '@nestjs/common'
import { LobbyCreateDto } from '../dtos/lobby.dto';
import { Server } from 'socket.io'
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Lobby, LobbyMode } from '../interfaces/lobby.interface';
import { v4 } from 'uuid';

@Injectable()
export class LobbyService {
    public server: Server;
    private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<Lobby['id'], Lobby>();

    public initializeSocket(@ConnectedSocket() client: Socket): void {

    }

    public terminateSocket(@ConnectedSocket() client: Socket): void {

    }

    public create(mode: LobbyMode, playerId: number): Lobby {
        const lobbyId = v4();
        const namespace = this.server.of(lobbyId);
        this.lobbies.set(lobbyId, {id: lobbyId, namespace: namespace, mode: mode, playerOne: 0, playerTwo: undefined})
        console.log(`Lobby create - [${this.lobbies.get(lobbyId)?.id}]`);
        return this.lobbies.get(lobbyId)!;
    }

    public join(lobbyId: string, @ConnectedSocket() client: Socket): void {
        this.lobbies.get(lobbyId)!.playerTwo = 1;
    } 
}