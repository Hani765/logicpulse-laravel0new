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
import { DateRangePicker } from "@/components/date-range-picker";
import { PageChart } from "@/components/charts/page-chart";
interface dataType {
    data: DomainsType[];
    pagination: any;
    chart_data: any[];
}
export default function Index({ auth }: PageProps) {
    const [url, setUrl] = useState(`/dashboard/fetch/domains`);
    const { data, isLoading, error } = useFetch<dataType>(url);

    return (
        <Authenticated user={auth.user}>
            <Head title="Domains">
                <meta
                    name="description"
                    content=" Manage and track your domains in one convenient
                        location."
                />
            </Head>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg">Domains</h2>
                    <p className="text-sm text-gray-500 hidden sm:block">
                        Manage and track your domains in one convenient
                        location.
                    </p>
                </div>
                <DateRangePicker
                    endPoint={url}
                    onUrlChange={(url: string) => setUrl(url)}
                />
            </div>
            <PageChart data={data?.chart_data} isLoading={isLoading} />
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
