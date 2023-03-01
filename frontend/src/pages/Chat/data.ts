export interface IChannels {
	name: string;
	id: number
}

export interface IMessages {
	id: number
	name: string;
	avatar: string;
	time: string;
	message: string;
	missedMessages: number;
	pastille: number;
}