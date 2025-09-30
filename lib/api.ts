"use client";

import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const useFetch = <T = unknown>(url: string) => {
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
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unexpected error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
