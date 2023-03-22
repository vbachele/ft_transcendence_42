export enum ClientSocialEvents {
	SendNotif = 'client.social.sendNotif',

	GetNotifications = 'client.social.getNotifications',
	ClearNotifs = 'client.social.clearNotifs',
	SendFriendRequest = 'client.social.sendFriendRequest',
}

export enum ServerSocialEvents {
	ReceiveNotif = 'server.social.receiveNotif',

	IncomingFriendRequest = 'server.social.incomingFriendRequest',
	IncomingNotifsRequest = 'server.social.incomingNotifsRequest',
}
