import React from "react";

type FetchResult<T> = {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
};

export default function useFetch<T>(url: string): FetchResult<T> {
    const [data, setData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<Error | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchData = async (url: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData(url);
    }, [url]);

    return { data, error, isLoading };
}
