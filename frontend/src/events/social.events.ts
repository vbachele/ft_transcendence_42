export enum ClientSocialEvents {
	RequestNotifs = 'client.social.requestNotifs',
	ClearNotifs = 'client.social.clearNotifs',

	SendFriendRequest = 'client.social.sendFriendRequest',
}

export enum ServerSocialEvents {
	IncomingFriendRequest = 'client.social.incomingFriendRequest',
	IncomingNotifsRequest = 'client.social.incomingNotifsRequest',
}
