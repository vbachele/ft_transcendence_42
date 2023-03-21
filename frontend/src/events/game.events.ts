export enum ClientGameEvents {
	Invite = 'client.game.invite',
	MovePaddle = 'client.game.movePaddle',
	Ready = 'client.game.ready',
	FetchSetup = 'client.game.fetchSetup',
}

export enum ServerGameEvents {
	Invitation = 'server.game.invitation',
	MovePaddle = 'server.game.movePaddle',
	MoveBall = 'server.game.moveBall',
	Setup = 'server.game.setup',
	PaddleHit = 'server.game.paddleHit',
}
