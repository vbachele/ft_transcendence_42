export enum ClientEvents {
  PaddlePosition = "client.paddlePosition",
  CreateLobby = 'client.createLobby',
  JoinLobby = 'client.joinLobby',
  LeaveLobby = "client.leaveLobby",
  InviteToLobby = 'client.inviteToLobby',
  InvitationResponse = 'client.invitationResponse'
}


export enum ServerEvents {
	BallPosition = "server.ballPosition",
	LobbyCreated = 'server.lobbyCreated',
	LobbyMessage = 'server.lobbyMessage',
	LobbyState = 'server.lobbyState',
	InvitedToLobby = 'server.invitedToLobby',
	InvitationDeclined = 'server.invitationDeclined',
	InvitationResponse = 'server.invitationResponse',
	AddedToLobby = 'server.addedToLobby',
}
