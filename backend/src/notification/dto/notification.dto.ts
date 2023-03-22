import {IsDate, IsIn, IsOptional, IsString} from 'class-validator';

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
		'BLOCKED',
		'MESSAGE',
		'BANNED',
		'KICKED',
		'ADMIN',
	])
	type: string;
}
