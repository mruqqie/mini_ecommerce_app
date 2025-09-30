"use client";

import { useEffect, useState } from "react";

const BASE_URL = `https://dummyjson.com/products`;

const useFetch = <T = any>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${BASE_URL}${url}`);
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.message || "An error occurred");
				}
				const json = await res.json();
				setData(json);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
