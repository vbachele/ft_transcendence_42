import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import {ValidationPipe} from '@nestjs/common';
import {WebsocketService} from '../websocket/websocket.service';
import {ClientSocialEvents, ServerSocialEvents} from './events/social.events';
import {NotificationDto} from './dto/notification.dto';
import {AuthenticatedSocket} from 'src/lobby/types/lobby.type';

interface Messages {
	ACHIEVEMENT: string;
	FRIEND_REQUEST: string;
	FRIEND_ACCEPT: string;
	FRIEND_DENY: string;
	BLOCKED: string;
	MESSAGE: string;
	BANNED: string;
	KICKED: string;
	ADMIN: string;
	[key: string]: string;
}

const messages: Messages = {
	ACHIEVEMENT: 'You have unlocked a new achievement',

	FRIEND_REQUEST: 'sent you a friend request',
	FRIEND_ACCEPT: 'accepted your friend request',
	FRIEND_DENY: 'denied your friend request',
	BLOCKED: 'blocked you', //todo pas sur
	MESSAGE: 'sent you a message',

	BANNED: "You've been banned from",
	KICKED: "You've been kicked out from",
	ADMIN: 'You are now the admin of',
};

function formatNotifMessage(
	sender: string,
	message: string,
	type: string
): string {
	if (
		type ===
		('FRIEND_REQUEST' ||
			'FRIEND_ACCEPT' ||
			'FRIEND_DENY' ||
			'BLOCKED' ||
			'MESSAGE')
	) {
		return `${sender} ${message}`;
	}
	if (type === ('BANNED' || 'KICKED' || 'ADMIN')) {
		return `${message} ${sender}`;
	}
	if (type === 'ACHIEVEMENT') {
		return `${message}`;
	}
	return ``;
}

interface INotification {
	id: number;
	message: string;
	sender: string;
	createdAt: Date;
}

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection {
	constructor(private readonly websocketService: WebsocketService) {}
	private readonly notifs: Map<string, INotification[]> = new Map<
		string,
		INotification[]
	>();

	async handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
		if (!this.notifs.has(client.data.name)) {
			this.notifs.set(client.data.name, []);
		}
	}

	@SubscribeMessage(ClientSocialEvents.GetNotifications)
	async getNotifications(
		@ConnectedSocket() client: AuthenticatedSocket
	): Promise<INotification[]> {
		const notifications = this.notifs.get(client.data.name) || [];
		return notifications;
	}

	@SubscribeMessage(ClientSocialEvents.ClearNotifs)
	onClearNotifs(@ConnectedSocket() client: AuthenticatedSocket) {
		let clientNotifs = this.notifs.get(client.data.name);
		clientNotifs?.splice(0);
		console.log(clientNotifs);
	}

	@SubscribeMessage(ClientSocialEvents.SendNotif)
	onSendNotif(@MessageBody(new ValidationPipe()) notifData: NotificationDto) {
		const client = this.websocketService.getClient(notifData.receiver);
		const clientNotifs = this.notifs.get(notifData.receiver);
		const message = formatNotifMessage(
			notifData.sender,
			messages[notifData.type],
			notifData.type
		);
		const newNotif: INotification = {
			id: Date.now(),
			message: message,
			sender: notifData.sender,
			createdAt: new Date(),
		};

		clientNotifs?.push(newNotif);
		if (client) {
			this.websocketService.server
				.to(client.id)
				.emit(ServerSocialEvents.ReceiveNotif, newNotif);
		}
	}
}
