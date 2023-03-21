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

interface INotification {
	id: number;
	message: string;
	sender: string;
	createdAt: Date;
	channel?: string;
	type:
		| 'ACHIEVEMENT'
		| 'FRIEND_REQUEST'
		| 'FRIEND_ACCEPT'
		| 'FRIEND_DENY'
		| 'BLOCKED'
		| 'MESSAGE'
		| 'BANNED'
		| 'KICKED'
		| 'ADMIN';
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

	@SubscribeMessage(ClientSocialEvents.RequestNotifs)
	onRequestNotifs(@MessageBody(new ValidationPipe()) data: NotificationDto) {
		const client = this.websocketService.getClient(data.senderName);
		const clientNotifs = this.notifs.get(data.senderName);

		if (client) {
			this.websocketService.server
				.to(client.id)
				.emit(ServerSocialEvents.IncomingNotifsRequest, clientNotifs);
		}
	}

	@SubscribeMessage(ClientSocialEvents.ClearNotifs)
	onClearNotifs(@MessageBody(new ValidationPipe()) data: NotificationDto) {
		const client = this.websocketService.getClient(data.senderName);
		const clientNotifs = this.notifs.get(data.senderName);
		clientNotifs?.splice(0);

		if (client) {
			this.websocketService.server
				.to(client.id)
				.emit(ServerSocialEvents.IncomingNotifsRequest, clientNotifs);
		}
	}

	@SubscribeMessage(ClientSocialEvents.SendFriendRequest)
	onSendRequest(@MessageBody(new ValidationPipe()) data: NotificationDto) {
		const clientNotifs = this.notifs.get(data.receiverName);
		const newNotif: INotification = {
			id: Date.now(),
			message: 'sent you a friend request',
			sender: data.senderName,
			createdAt: new Date(),
			type: 'FRIEND_REQUEST',
		};

		clientNotifs?.push(newNotif);

		const client = this.websocketService.getClient(data.receiverName);

		if (client) {
			this.websocketService.server
				.to(client.id)
				.emit(ServerSocialEvents.IncomingFriendRequest, data.senderName);
		}
	}
}
