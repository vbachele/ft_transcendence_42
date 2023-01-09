import { useEffect, useState } from "react";

const useFetch = (url: string) => {
	const [data, setData] = useState<unknown>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		fetch(url)
		.then(res => {
			return res.json();
		})
		.then(data => {
			setData(data);
			setIsLoading(false);
			setError(null);
		})
		.catch(error => {
			setError("Could not fetch the data");
			setIsLoading(false);
		})
	}, [url]);

	return { data, isLoading, error };
}

export default useFetch;
