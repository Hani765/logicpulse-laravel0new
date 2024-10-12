import { DataTable } from "@/components/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Create from "./components/create/create";
import { Columns } from "./components/columns";
import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";

// Define types for API response
interface FetchData {
    data: any;
    pagination: any;
}

export default function Index({ auth }: { auth: any }) {
    const role = auth.user.role;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<FetchData | null>(null); // null if no data initially
    const [url, setUrl] = useState<string>("/fetch-users");
    const endPoint = "";

    // Fetch users function with proper typing
    const fetchUsers = async (queryUrl: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(queryUrl);
            const users: FetchData = await response.json();
            setData(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced search function
    const debouncedFetch = useCallback(
        debounce((value: string) => {
            setUrl(`/fetch-users?q=${value}`);
        }, 500), // 500ms delay
        [],
    );

    useEffect(() => {
        fetchUsers(url);
    }, [url]);

    return (
        <Authenticated user={auth.user}>
            <Head title="Users" />
            <div className="text-gray-600 dark:text-gray-200 text-sm mb-2">
                <Create role={role} />
            </div>

            <Input
                type="text"
                placeholder="Search by name, email, or role"
                onChange={(e) => debouncedFetch(e.target.value)} // Use debounced function here
            />

            {/* Loading state */}
            {data && (
                <DataTable
                    data={data.data} // safely access user data
                    endPoint={endPoint}
                    columns={Columns(role)} // assuming Columns returns columns based on role
                    pagination={data.pagination} // safely access pagination data
                    isLoading={isLoading}
                />
            )}
        </Authenticated>
    );
}
