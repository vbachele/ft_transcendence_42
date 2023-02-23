import { Server } from "socket.io";
import { AuthenticatedSocket } from "./types/server.type";
import { Lobby } from "./lobby";
import { Instance } from "./instance";
import { Pong } from "../game/pong";
import { PrismaLobbyService } from "src/database/lobby/prismaLobby.service";
import { Lobby as LobbyModel } from "@prisma/client";
import { ServerEvents } from "./events/lobby.events";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LobbyService {
  constructor(private readonly prismaLobbyService: PrismaLobbyService) {}

  private readonly lobbies: Map<Lobby["data"]["id"], Lobby> = new Map<
    Lobby["data"]["id"],
    Lobby
  >();
  public server: Server;

  public async initializeSocket(client: AuthenticatedSocket) {
    client.addLobby = (lobby: Lobby) => {
      switch (lobby.data.type) {
        case "game":
          client.data.gameLobby = lobby;
          break;
        case "chat":
          client.data.chatLobbies.set(lobby.data.id, lobby);
      }
      console.log(`Lobby joined`, lobby.data);
    };
    try {
      const lobbies = await this.prismaLobbyService.lobbiesFromUserName(
        client.data.name
      );
      lobbies?.forEach((lobbyData) => {
        const lobby = this.lobbies.get(lobbyData.id);
        if (lobby) client.addLobby(lobby);
      });
    } catch (e) {
      console.error(e);
    }
  }

  public terminateSocket(client: AuthenticatedSocket): void {}

  public async create(
    mode: string,
    type: string,
    owner: string
  ): Promise<LobbyModel> {
    let maxClients = 2;
    let instance: Instance | undefined = undefined;

    switch (mode) {
      case "solo":
        maxClients = 1;
        break;
      case "duo":
        maxClients = 2;
    }

    switch (type) {
      case "game":
        instance = new Pong();
        break;
      case "chat":
        instance = undefined;
    }

    const lobby = new Lobby(this.server, maxClients, type, instance);

    this.lobbies.set(lobby.data.id, lobby);

    try {
      return await this.prismaLobbyService.pushLobby(lobby.data, owner);
    } catch (e) {
      throw new Error(`Error when creating lobby entry in database: ` + e);
    }
  }

  public fetchSocketID(lobbyID: string, username: string): string {
    const lobby = this.lobbies.get(lobbyID);
    if (!lobby) {
      throw new Error(`Lobby [${lobbyID}] doesn't exist`);
    }
    return lobby.fetchSocketID(username);
  }

  public dispatchResponse(lobbyID: string, response: string) {
    const lobby = this.lobbies.get(lobbyID);
    if (!lobby) {
      throw new Error(`Lobby [${lobbyID}] doesn't exist`);
    }
    lobby.dispatchToLobby(ServerEvents.InvitationResponse, {
      response: response,
    });
    console.log(`Response sent`);
  }

  public join(lobbyId: string, client: AuthenticatedSocket): void {
    const lobby = this.lobbies.get(lobbyId);

    if (!lobby) throw new Error("Lobby doesn't exist");
    else lobby.addClient(client);
  }

  public async delete(lobbyId: string) {
    try {
      this.lobbies.delete(lobbyId);
      await this.prismaLobbyService.deleteLobby(lobbyId);
    } catch {
      throw new Error("Can't delete lobby: ");
    }
  }
}
