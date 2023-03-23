export enum ClientSocialEvents {
	SendNotif = 'client.social.sendNotif',
	GetNotifications = 'client.social.getNotifications',
	ClearNotifs = 'client.social.clearNotifs',
	UpdateUsername = 'client.social.updateUsername',
}

export enum ServerSocialEvents {
	ReceiveNotif = 'server.social.receiveNotif',
}
