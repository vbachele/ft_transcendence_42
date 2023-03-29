import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {useEffect, useState} from 'react';
import {IUser} from 'types/models';

async function fetchUser(name: string, blockedOf: string) {
	const data = await backend.getUserByName(name, blockedOf);
	if (data) {
		return {data, error: null};
	} else {
		return {data: null, error: 'Could not fetch the data'};
	}
}

function useFetchUserByName(name?: string) {
	const {userName} = useUserInfos();
	const [data, setData] = useState<IUser | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!name) return;
		async function fetchData() {
			const {data, error} = await fetchUser(name!, userName.userName);

			setData(data);
			setError(error);
			setIsLoading(false);
		}
		fetchData();
	}, [name]);

	return {data, isLoading, error};
}

export default useFetchUserByName;
