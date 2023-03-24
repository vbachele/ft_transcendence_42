export enum ClientChatEvents {
	FetchLobbies = 'client.chat.fetchLobbies',
	SendMessage = 'client.chat.sendMessage',
	FetchUsers = 'client.chat.fetchUsers',
	FetchUsersExceptMe = "client.chat.fetchUsersExceptMe"
}


export enum ServerChatEvents {
	LobbyList = 'server.chat.lobbyList',
	IncomingMessage = 'server.chat.incomingMessage',
	LobbyCreated = 'server.chat.lobbyCreated',
	UserList = 'server.chat.userList',
	UserListExceptMe = "server.chat.userListExceptMe"
}