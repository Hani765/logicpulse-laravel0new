import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import Cat from "./partials/cat";
import OffersTable from "./partials/offersTable";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

export default function Index({ auth }: PageProps) {
    const [selectedCat, setSelectedCat] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [offers, setOffers] = useState<any[]>([]); // To store fetched offers
    const [isLoading, setIsLoading] = useState(true);

    // Fetch offers based on category and query
    const fetchOffers = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `/fetch-public-offers?category=${selectedCat}&q=${query}`,
            );
            setOffers(response.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedCat, query]); // Add selectedCat and query to the dependency array

    // Debounced version of the fetch function
    const debouncedFetch = useCallback(
        debounce(fetchOffers, 500), // 500ms delay
        [fetchOffers], // Correct dependencies
    );

    useEffect(() => {
        debouncedFetch(); // Trigger debounced fetch on selectedCat or query change
        return () => {
            debouncedFetch.cancel(); // Clean up the debounced function on unmount or change
        };
    }, [selectedCat, query, debouncedFetch]);

    return (
        <Authenticated user={auth.user}>
            <Head title="Market-Place" />
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
            />
            <Cat
                selected={selectedCat}
                onSelect={(unique_id: string) => setSelectedCat(unique_id)}
            />
            <OffersTable isLoading={isLoading} data={offers} />
        </Authenticated>
    );
}
