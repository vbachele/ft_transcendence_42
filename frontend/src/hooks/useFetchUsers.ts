import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {useEffect, useState} from 'react';
import {IUser} from 'types/models';

async function fetchAllUsers(blockedOf: string) {
	console.log('blockedOf: [', blockedOf, ']');

	try {
		const data = await backend.getAllUsers(blockedOf);
		return {data, error: null};
	} catch (err) {
		return {data: null, error: 'Could not fetch the data'};
	}
}

function useFetchUsers(blockedOf?: string) {
	const {userName} = useUserInfos();
	const [data, setData] = useState<IUser[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	console.log('blockedOf: [', blockedOf, ']');
	useEffect(() => {
		async function fetchData() {
			const {data, error} = await fetchAllUsers(
				blockedOf ? blockedOf : userName.userName
			);
			setData(data);
			setError(error);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	return {data, isLoading, error};
}

export default useFetchUsers;
