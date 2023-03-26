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

enum EMessages {
	ACHIEVEMENT = 'You have unlocked a new achievement !',
	FRIEND_REQUEST = 'sent you a friend request',
	FRIEND_ACCEPT = 'accepted your friend request',
	FRIEND_DENY = 'denied your friend request',
	REMOVE = 'You are no longer friends with',
	MESSAGE = 'sent you a message',
	BANNED = "You've been banned from",
	KICKED = "You've been kicked out from",
	ADMIN = 'You are now the admin of',
}

interface INotification {
	id: number;
	message: string;
	sender: string;
	createdAt: Date;
	type: string;
}

function formatNotifMessage(
	sender: string,
	message: string,
	type: string
): string {
	if (
		['FRIEND_REQUEST', 'FRIEND_ACCEPT', 'FRIEND_DENY', 'MESSAGE'].includes(type)
	) {
		return `${sender} ${message}`;
	} else if (['REMOVE', 'BANNED', 'KICKED', 'ADMIN'].includes(type)) {
		return `${message} ${sender}`;
	} else if (type === 'ACHIEVEMENT') {
		return `${message}`;
	} else {
		return ``;
	}
}

function replaceUsernameInMap(
	map: Map<string, INotification[]>,
	oldUsername: string,
	newUsername: string
): Map<string, INotification[]> {
	if (map.has(oldUsername)) {
		const notifications = map.get(oldUsername);
		map.delete(oldUsername);
		map.set(newUsername, notifications!);
	}
	return map;
}

function updateNotifications(
	map: Map<string, INotification[]>,
	oldUsername: string,
	newUsername: string
): void {
	map.forEach((notifs: INotification[], key: string) => {
		const updatedNotifs = notifs.map((notif: INotification) => {
			if (notif.sender === oldUsername) {
				notif.sender = newUsername;
			}
			if (notif.message.includes(oldUsername)) {
				notif.message = notif.message.replace(oldUsername, newUsername);
			}
			return notif;
		});
		map.set(key, updatedNotifs);
	});
}

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection {
	constructor(private readonly websocketService: WebsocketService) {}
	private notifs: Map<string, INotification[]> = new Map<
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

	@SubscribeMessage(ClientSocialEvents.UpdateUsername)
	onUpdateUsername(
		@ConnectedSocket() client: AuthenticatedSocket,
		@MessageBody() newUsername: string
	) {
		replaceUsernameInMap(this.notifs, client.data.name, newUsername);
		updateNotifications(this.notifs, client.data.name, newUsername);

		client.data.name = newUsername;
	}

	@SubscribeMessage(ClientSocialEvents.ClearNotifs)
	onClearNotifs(@ConnectedSocket() client: AuthenticatedSocket) {
		let clientNotifs = this.notifs.get(client.data.name);
		clientNotifs?.splice(0);
	}

	@SubscribeMessage(ClientSocialEvents.SendNotif)
	onSendNotif(@MessageBody(new ValidationPipe()) notifData: NotificationDto) {
		const client = this.websocketService.getClient(notifData.receiver);
		const clientNotifs = this.notifs.get(notifData.receiver);

		const message = formatNotifMessage(
			notifData.sender,
			EMessages[notifData.type as keyof typeof EMessages],
			notifData.type
		);

		const newNotif: INotification = {
			id: Date.now(),
			message: message,
			sender: notifData.sender,
			createdAt: new Date(),
			type: notifData.type,
		};

		const existingNotif = clientNotifs?.find(
			(notif) =>
				notif.message === message &&
				notif.type === notifData.type &&
				notif.sender === notifData.sender
		);

		if (!existingNotif) {
			clientNotifs?.push(newNotif);
		}

		if (client) {
			this.websocketService.server
				.to(client.id)
				.emit(ServerSocialEvents.ReceiveNotif, newNotif);
		}
	}
}
