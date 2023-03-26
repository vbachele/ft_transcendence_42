export enum ClientChatEvents {
	FetchLobbies = 'client.chat.fetchLobbies',
	SendMessage = 'client.chat.sendMessage',
	FetchUsers = 'client.chat.fetchUsers',
	FetchUsersExceptMe = "client.chat.fetchUsersExceptMe",
	KickUser = "client.chat.kickUser",
	KickedFromLobby = "client.chat.kickedFromLobby"
}

export enum ServerChatEvents {
	LobbyList = 'server.chat.lobbyList',
	IncomingMessage = 'server.chat.incomingMessage',
	LobbyCreated = 'server.chat.lobbyCreated',
	UserList = 'server.chat.userList',
	UserListExceptMe = "server.chat.userListExceptMe",
	UserKicked = "server.chat.userKicked",
	KickedFromLobby = "server.chat.kickedFromLobby"
}