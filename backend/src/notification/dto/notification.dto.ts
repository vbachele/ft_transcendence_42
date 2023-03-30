import {IsIn, IsOptional, IsString} from 'class-validator';

export class NotificationDto {
	@IsString()
	sender: string;

	@IsString()
	@IsOptional()
	receiver: string;

	@IsString()
	@IsIn([
		'ACHIEVEMENT',
		'FRIEND_REQUEST',
		'FRIEND_ACCEPT',
		'FRIEND_DENY',
		'REMOVE',
		'MESSAGE',
		'BANNED',
		'KICKED',
		'ADMIN',
		'MUTED',
	])
	type: string;
}
