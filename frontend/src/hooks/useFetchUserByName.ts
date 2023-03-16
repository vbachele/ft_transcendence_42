import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {useEffect, useState} from 'react';
import {IUser} from 'types/models';

async function fetchUser(name: string, blockedOf: string) {
	try {
		const data = await backend.getUserByName(name, blockedOf);
		return {data, error: null};
	} catch (err) {
		return {data: null, error: 'Could not fetch the data'};
	}
}

function useFetchUserByName(name: string) {
	const {userName} = useUserInfos();
	const [data, setData] = useState<IUser | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			const {data, error} = await fetchUser(name, userName.userName);

			setData(data);
			setError(error);
			setIsLoading(false);
		}
		fetchData();
	}, [name]);

	return {data, isLoading, error};
}

export default useFetchUserByName;
