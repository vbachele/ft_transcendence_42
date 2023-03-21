import {isArray, IsString} from 'class-validator';

export class NotificationDto {
	@IsString()
	senderName: string;
	@IsString()
	receiverName: string;
}
