import {Socket} from 'socket.io-client';

export function asyncEmit(
	client: Socket,
	emitEvent: string,
	data: any,
	onEvent?: string
): Promise<any> {
	return new Promise(function (resolve, reject) {
		client?.emit(emitEvent, data);
		client?.on(onEvent ? onEvent : emitEvent, (result) => {
			client?.off(onEvent);
			resolve(result);
		});
		client?.on('exception', (error) => {
			client?.off(onEvent);
			reject(error);
		});
		setTimeout(reject, 2_000);
	});
}
