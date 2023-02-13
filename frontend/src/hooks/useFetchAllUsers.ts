import {backend} from 'lib/backend';
import {useEffect, useState} from 'react';
import {IUser} from 'types/models';

function useFetchAllUsers() {
	const [data, setData] = useState<IUser[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		backend
			.getAllUsers()
			.then((data) => {
				setData(data);
				setIsLoading(false);
				setError(null);
			})
			.catch((err) => {
				setError('Could not fetch the data');
				setIsLoading(false);
			});
	}, []);

	return {data, isLoading, error};
}

export default useFetchAllUsers;
