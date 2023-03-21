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

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection {
	constructor(private readonly websocketService: WebsocketService) {}
	private readonly notifs: Map<string, string[]> = new Map<string, string[]>();

	async handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
		console.log('BACKEND', [...this.notifs.entries()]);
		if (this.notifs.has(client.data.name)) {
			// this.notifs.get(client.data.name);
		} else {
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
		clientNotifs?.push(`${data.senderName} sent you a friend request`);

		const client = this.websocketService.getClient(data.receiverName);

		if (client) {
			this.websocketService.server
				.to(client.id)
				.emit(ServerSocialEvents.IncomingFriendRequest, data.senderName);
		}
	}
}
