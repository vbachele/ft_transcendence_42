export enum ClientGameEvents {
	Invite = "client.game.invite",
	MovePaddle = "client.game.movePaddle",
	Ready = "client.game.ready",
	FetchSetup = "client.game.fetchSetup",
	SearchGame = "client.game.searchGame",
	LeaveGame = "client.game.leaveGame",
	CancelSearch = "client.game.cancelSearch",
	CancelInvitation = "client.game.cancelInvitation",
	FetchGames = "client.game.fetchGames",
	Spectate = "client.game.spectate",
	LobbyFromUser = "client.game.lobbyFromUser",
}

export enum ServerGameEvents {
	Invitation = "server.game.invitation",
	MovePaddle = "server.game.movePaddle",
	MoveBall = "server.game.moveBall",
	Setup = "server.game.setup",
	PaddleHit = "server.game.paddleHit",
	GameFound = "server.game.gameFound",
	GamePaused = "server.game.gamePaused",
	UpdateScore = "server.game.updateScore",
	Timer = "server.game.timer",
	GameResult = "server.game.gameResult",
	InvitationCancelled = "server.game.invitationCancelled",
	ClientLeft = "server.game.clientLeft",
	LobbyFromUser = "server.game.lobbyFromUser",
}
