export enum ClientEvents {
  PaddlePosition = "client.paddlePosition",
  CreateLobby = 'client.createLobby',
  JoinLobby = 'client.joinLobby',
  InviteToLobby = 'client.inviteToLobby',
  InvitationResponse = 'client.invitationResponse'
}

export enum ServerEvents {
  BallPosition = "server.ballPosition",
  LobbyCreated = 'server.lobbyCreated',
  GameMessage = 'server.gameMessage',
  LobbyState = 'server.lobbyState',
  InvitedToLobby = 'server.invitedToLobby',
  InvitationDeclined = 'server.invitationDeclined',
}
