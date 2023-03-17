import {backend} from 'lib/backend';
import {useEffect, useState} from 'react';
import {IUser} from 'types/models';

interface IPendings {
	sentPendings: IUser[];
	receivedPendings: IUser[];
}

async function fetchPendings(name: string) {
	try {
		const data = await backend.getPendingsOf(name);
		return {
			sentPendings: data.sentPendings || [],
			receivedPendings: data.receivedPendings || [],
			error: null,
		};
	} catch (err) {
		return {
			sentPendings: [],
			receivedPendings: [],
			error: 'Could not fetch the data',
		};
	}
}

function useFetchPendingsOf(name: string) {
	const [sentPendings, setSentPendings] = useState<IUser[]>([]);
	const [receivedPendings, setReceivedPendings] = useState<IUser[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const {sentPendings, receivedPendings, error} = await fetchPendings(
					name
				);
				setSentPendings(sentPendings || []);
				setReceivedPendings(receivedPendings || []);
				setError(error);
			} catch (err) {
				setError('Could not fetch the data');
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [name]);

	return {sentPendings, receivedPendings, isLoading, error};
}

export default useFetchPendingsOf;
