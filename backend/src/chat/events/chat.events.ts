export enum ClientChatEvents {
  SendMessage = "client.chat.sendMessage",
  FetchLobbies = "client.chat.fetchLobbies",
  FetchUsers = "client.chat.fetchUsers",
  FetchUsersExceptMe = "client.chat.fetchUsersExceptMe",
  BanUser = "client.chat.banUser",
  KickUser = "client.chat.kickUser",
  MuteUser = "client.chat.muteUser",
  SetAdmin = "client.chat.setAdmin",
  KickedFromLobby = "client.chat.kickedFromLobby"
}


export enum ServerChatEvents {
  IncomingMessage = "server.chat.incomingMessage",
  LobbyList = "server.chat.lobbyList",
  LobbyCreated = "server.chat.lobbyCreated",
  UserList = "server.chat.userList",
  UserBanned = "server.chat.userBanned",
  UserKicked = "server.chat.userKicked",
  UserMuted = "server.chat.userMuted",
  UserSetAdmin = "server.chat.userSetAdmin",
  UserListExceptMe = "server.chat.userListExceptMe",
  KickedFromLobby = "server.chat.kickedFromLobby"
}
