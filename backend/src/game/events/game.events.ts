export enum ClientGameEvents {
  Invite = "client.game.invite",
  MovePaddle = "client.game.movePaddle",
  Ready = "client.game.ready",
  FetchSetup = "client.game.fetchSetup",
  MoveBall = "client.game.moveBall",
  SearchGame = "client.game.searchGame",
  LeaveGame = "client.game.leaveGame",
  CancelSearch = "client.game.cancelSearch",
  CancelInvitation = "client.game.cancelInvitation",
}

export enum ServerGameEvents {
  Invitation = "server.game.invitation",
  MovePaddle = "server.game.movePaddle",
  Setup = "server.game.setup",
  MoveBall = "server.game.moveBall",
  Start = "server.game.start",
  PaddleHit = "server.game.paddleHit",
  GameFound = "server.game.gameFound",
  UpdateScore = "server.game.updateScore",
  Timer = "server.game.timer",
  GameResult = "server.game.gameResult",
  InvitationCancelled = "server.game.invitationCancelled",
}

