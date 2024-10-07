import { DataTable } from "@/components/table";
import { DomainsType, PageProps, User } from "@/types";
import { Columns } from "./components/columns";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Create from "./components/create/CreateDialogue";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import useFetch from "@/hooks/usefetch";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import { LucideServerCrash } from "lucide-react";
interface dataType {
    data: DomainsType[];
    pagination: any;
}
export default function Index({ auth }: PageProps) {
    const role = auth.user.role;
    const [url, setUrl] = useState(`/dashboard/fetch/domains`);
    const { data, isLoading, error } = useFetch<dataType>(url);
    return (
        <Authenticated user={auth.user}>
            <Head title="Domains" />
            {error ? (
                <div className="min-h-72 bg-white flex border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600">
                    <LucideServerCrash size={44} />
                    <div>
                        Something went wrong please try to refresh the page.
                    </div>
                </div>
            ) : !data ? (
                <DataTableSkeleton
                    rowCount={8}
                    columnCount={8}
                    showViewOptions={false}
                />
            ) : (
                <DataTable
                    isLoading={isLoading}
                    data={data.data}
                    pagination={data.pagination}
                    endPoint={url}
                    columns={Columns()}
                    onUrlChange={(url: string) => setUrl(url)}
                    isPagination
                    Create={Create}
                />
            )}
        </Authenticated>
    );
}
