import { Controller, Body, Post } from "@nestjs/common";
import { LobbyCreateDto } from "./lobby/dtos/lobby.dto";

@Controller("game")
export class GameController {
  @Post("create")
  async createGame(@Body() data: LobbyCreateDto) {
    return "ok";
  }
}
