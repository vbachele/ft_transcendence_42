import {backend} from 'lib/backend';
import {IUser} from 'types/models';

export const fetchPendings = async (
	username: string
): Promise<{
	sentPendings: IUser[] | null;
	receivedPendings: IUser[] | null;
}> => {
	try {
		const data = await backend.getPendingsOf(username);
		return {
			sentPendings: data.sentPendings || [],
			receivedPendings: data.receivedPendings || [],
		};
	} catch (error) {
		return {sentPendings: null, receivedPendings: null};
	}
};
