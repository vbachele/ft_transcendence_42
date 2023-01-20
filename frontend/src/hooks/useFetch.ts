import { useEffect, useState } from "react";

function useFetch<Data>(url: string) {
	const [data, setData] = useState<Data | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then((data: Data) => {
				setData(data);
				setIsLoading(false);
				setError(null);
			})
			.catch(err => {
				setError("Could not fetch the data");
				setIsLoading(false);
			})
	}, [url]);

	return { data, isLoading, error };
}

export default useFetch;
