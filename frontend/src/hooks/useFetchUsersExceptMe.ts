import {backend} from 'lib/backend';
import {useEffect, useState} from 'react';
import {IUser} from 'types/models';

async function fetchAllUsers(name: string) {
	try {
		const data = await backend.getAllUsersExceptMe(name);
		return {data, error: null};
	} catch (err) {
		return {data: null, error: 'Could not fetch the data'};
	}
}

function UseFetchUsersExceptMe(name: string) {
	const [data, setData] = useState<IUser[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			const {data, error} = await fetchAllUsers(name);
			setData(data);
			setError(error);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	return {data, isLoading, error};
}

export default UseFetchUsersExceptMe;