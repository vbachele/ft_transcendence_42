export enum ClientChatEvents {
	FetchLobbies = 'client.chat.fetchLobbies',
	SendMessage = 'client.chat.sendMessage',
}

export enum ServerChatEvents {
	LobbyList = 'server.chat.lobbyList',
	IncomingMessage = 'server.chat.incomingMessage',
}