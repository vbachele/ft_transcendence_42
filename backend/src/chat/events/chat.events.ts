export enum ClientChatEvents {
	SendMessage = "client.chat.sendMessage",
	FetchLobbies = "client.chat.fetchLobbies",
}

export enum ServerChatEvents {
	IncomingMessage = "server.chat.incomingMessage",
	LobbyList = "server.chat.lobbyList",
	LobbyCreated = "server.chat.lobbyCreated",
}