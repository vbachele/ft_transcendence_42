import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import {ValidationPipe} from '@nestjs/common';
import {WebsocketService} from '../websocket/websocket.service';
import {ClientSocialEvents, ServerSocialEvents} from './events/social.events';
import {NotificationDto} from './dto/notification.dto';

@WebSocketGateway()
export class NotificationGateway {
	constructor(private readonly websocketService: WebsocketService) {}
	public test: number = 15;

	@SubscribeMessage(ClientSocialEvents.SendRequest)
	onSendRequest(@MessageBody(new ValidationPipe()) data: NotificationDto) {
		const client = this.websocketService.getClient(data.receiverName);

		if (client) {
			this.websocketService.server
				.to(client.id)
				.emit(ServerSocialEvents.IncomingRequest, data.senderName);
		}
	}
}
