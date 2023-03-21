import {IsOptional, IsString} from 'class-validator';

export class NotificationDto {
	@IsString()
	senderName: string;

	@IsString()
	@IsOptional()
	receiverName: string;

	@IsString()
	@IsOptional()
	type: string;
}
